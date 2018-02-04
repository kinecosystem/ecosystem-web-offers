declare namespace KinNative {
	function loaded(): void;
	function handleExecutionError(executionId: string, error: string): void;
	function handleExecutionResult(executionId: string, result: string): void;
}
