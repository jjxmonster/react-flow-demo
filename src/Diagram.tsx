/* eslint-disable @typescript-eslint/ban-ts-comment */
import "@xyflow/react/dist/style.css";

import data from "./data.json";
import {
	getStraightPath,
	Handle,
	Position,
	ReactFlow,
	ReactFlowProvider,
} from "@xyflow/react";

import { FC } from "react";
import { EdgeProps, EdgeLabelRenderer, BaseEdge, Edge } from "@xyflow/react";

const CustomEdge: FC<EdgeProps<Edge<{ label: string }>>> = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	data,
}) => {
	const [edgePath, labelX, labelY] = getStraightPath({
		sourceX,
		sourceY,
		targetX,
		targetY,
	});

	return (
		<>
			<BaseEdge id={id} path={edgePath} style={{ strokeDasharray: "10 10" }} />

			<EdgeLabelRenderer>
				<div
					style={{
						position: "absolute",
						transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
						padding: 10,
						borderRadius: 5,
						fontSize: 12,
						fontWeight: 700,
						color: "gray",
						background: "white",
						width: 100,
					}}
					className="nodrag nopan"
				>
					{data?.label}
				</div>
			</EdgeLabelRenderer>
		</>
	);
};

const positions = {
	top: Position.Top,
	right: Position.Right,
	bottom: Position.Bottom,
	left: Position.Left,
};

const edgeTypes = {
	"custom-edge": CustomEdge,
};

const nodeTypes = {
	// @ts-ignore
	customer: ({ data }) => (
		<div
			style={{
				padding: 10,
				border: "1px solid #000",
				borderRadius: 5,
				width: 200,
				textAlign: "center",
				backgroundColor: "#1A75CF",
				color: "#fff",
			}}
		>
			<Handle type="target" position={Position.Right} id={data.id} />
			<Handle type="source" position={Position.Bottom} id={data.id} />
			{data.label}
		</div>
	),
	// @ts-ignore
	system: ({ data }) => {
		return (
			<div
				style={{
					padding: 10,
					border: "1px solid #000",
					borderRadius: 5,
					width: 200,
					textAlign: "center",
					backgroundColor: "#6C757D",
					color: "#fff",
				}}
			>
				<Handle
					type="source"
					// @ts-ignore
					position={positions[data.sourcePosition]}
					id={data.id + "source"}
				/>
				{data.sourcePosition2 && (
					<Handle
						type="source"
						// @ts-ignore
						position={positions[data.sourcePosition2]}
						id={data.id + "source2"}
					/>
				)}
				<Handle
					type="target"
					// @ts-ignore
					position={positions[data.targetPosition]}
					id={data.id + "target"}
				/>
				{data.label}
			</div>
		);
	},
};

const Diagram = () => {
	return (
		<ReactFlowProvider>
			<div style={{ height: "100vh", width: "100vw" }}>
				<ReactFlow
					edgeTypes={edgeTypes}
					nodes={data.nodes}
					edges={data.edges}
					nodeTypes={nodeTypes}
				></ReactFlow>
			</div>
		</ReactFlowProvider>
	);
};

export default Diagram;
