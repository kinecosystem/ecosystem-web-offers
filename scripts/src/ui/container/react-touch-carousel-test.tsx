// import * as React from "react";
// import TouchCarousel, {clamp} from "react-touch-carousel"
// import touchWithMouseHOC from 'react-touch-carousel/lib/touchWithMouseHOC'
//
// const data = [
// 	{
// 		title: "Card 1",
// 		background: "#0072bb",
// 		text: `react-touch-carousel only handles the trouble parts, i.e.
//     - touch gestures parsing
//     - scroll cursor rounding and modding
//     - items padding and looping
//     - auto playing`,
// 	},
// 	{
// 		title: "Card 2",
// 		background: "#ff4c3b",
// 		text: `It is left up to you to
//     - decide the carousel structure
//     - render each item in the carousel
//     - style everything
//     - add some fancy decorators like dots`,
// 	},
// 	{
// 		title: "Card 3",
// 		background: "#ffca18",
// 		text: `Install it by
//     - npm install --save react-touch-carousel`,
// 	},
// 	{
// 		title: "Card 4",
// 		background: "#44c1c1",
// 		text: `See some example code in the '/examples' dir at GitHub. And you can run and play with the code after cloning it, by
//     - npm install
//     - npm run dev
//     - open localhost:5000`,
// 	},
// 	{
// 		title: "Card 5",
// 		background: "#29c53c",
// 		text: "react-touch-carousel is released under MIT license",
// 	},
// ];
//
// const cardSize = 300;
// const cardPadCount = 0;
// const carouselWidth = clamp(window.innerWidth, 0, 960);
//
// function CarouselContainer(props: any) {
// 	const { cursor, carouselState: { active, dragging }, ...rest } = props;
// 	let current = -Math.round(cursor) % data.length;
// 	while (current < 0) {
// 		current += data.length;
// 	}
// 	// Put current card at center
// 	const translateX = (cursor - cardPadCount) * cardSize + (carouselWidth - cardSize) / 2;
// 	return (
// 		<div
// 			className="carousel-cont"
// 		>
// 			<div
// 				className="carousel-track"
// 				style={{ transform: `translate3d(${translateX}px, 0, 0)` }}
// 				{...rest}
// 			/>
//
// 			<div
// 				className="carousel-pagination-wrapper">
// 				<ol className="carousel-pagination">
// 					{data.map((_, index) => (
// 						<li
// 							key={index}
// 							className={current === index ? "current" : ""}
// 						/>
// 					))}
// 				</ol>
// 			</div>
// 		</div>
// 	);
// }
//
// function log(text: any) {
// 	console.log(text);
// }
//
// const Container = touchWithMouseHOC(CarouselContainer);
//
// export class Carousel extends React.Component {
// 	renderCard(index: any, modIndex: any) {
// 		const item = data[modIndex];
// 		return (
// 			<div
// 				key={index}
// 				className="carousel-card"
// 				onClick={() => log(`clicked card ${1 + modIndex}`)}
// 			>
// 				<div
// 					className="carousel-card-inner"
// 					style={{backgroundColor: item.background}}
// 				>
// 					<div
// 						className="carousel-title">{item.title}</div>
// 					<div
// 						className="carousel-text">{item.text}</div>
// 				</div>
// 			</div>
// 		);
// 	}
//
// 	public render() {
// 		return (
// 			<TouchCarousel
// 				component={Container}
// 				cardSize={cardSize}
// 				cardCount={data.length}
// 				cardPadCount={cardPadCount}
// 				loop={false}
// 				autoplay={false}
// 				renderCard={this.renderCard}
// 				onRest={(index: any) => log(`rest at index ${index}`)}
// 				onDragStart={() => log("dragStart")}
// 				onDragEnd={() => log("dragEnd")}
// 				onDragCancel={() => log("dragCancel")}
// 			/>
// 		);
// 	}
// }
