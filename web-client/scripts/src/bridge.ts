import * as output from "./output";

export type ExecutionRequest = {
	id: string;
	name: string;
	data?: any;
}

export type KinApi = {
	execute(request: ExecutionRequest): void;
}

declare global {
	interface Window {
		kin: KinApi;
	}
}

if (!window.kin) {
	window.kin = {} as KinApi;
}

window.kin.execute = function(request: ExecutionRequest) {
	console.log("window.kin.execute", request);
	output.append(`execute "${ request.name }" (id="${ request.id }"), data: ${ JSON.stringify(request.data) }`);

	if (!EXECUTORS[request.name]) {
		return;
	}

	try {
		successResponse(request, EXECUTORS[request.name](request.data));
	} catch (e) {
		failureResponse(request, EXECUTORS[request.name](request.data));
	}
}

export type Executer = (data: any) => any;

const EXECUTORS = {} as { [name: string]: Executer };
(window as any).tmp = EXECUTORS;
export function listen(name: string, executer: Executer): void {
	console.debug("listen ", name, executer);
	EXECUTORS[name] = executer;
}

function successResponse(request: ExecutionRequest, response: any) {
	const result = JSON.stringify(response);
	output.append(`responding "${ request.name }" (id="${ request.id }"), response: ${ result }`);
	KinNative.handleExecutionResult(request.id, result);
}

function failureResponse(request: ExecutionRequest, error: any) {
	const result = JSON.stringify(error);
	output.append(`responding "${ request.name }" (id="${ request.id }"), response: ${ result }`);
	KinNative.handleExecutionError(request.id, result);
}
