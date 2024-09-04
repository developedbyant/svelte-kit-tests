export async function GET(event) {
	console.log("Received request");

	try {
		const stream = new ReadableStream({
			async start(controller) {
				for (let i = 0; i < 10; i++) {
					await new Promise((resolve) => setTimeout(resolve, 1000));
					const chunk = `data: Chunk ${i}\n\n`;
					console.log("Sending:", chunk);
					controller.enqueue(chunk);
				}
				console.log("Stream complete");
				controller.close();
			},
		});
		return new Response(stream, {
			headers: {
				"content-type": "text/event-stream",
			},
		});
	} catch (error) {
		console.error("Error in GET handler:", error);
		return new Response("Internal Server Error", { status: 500 });
	}
}
