class GeminiAIService{
    // sendMessage = async (prompt: string) => {
    //     const response = await fetch('/api/geminiAI', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({ prompt: prompt }),
    //     });
    //     console.log(response)
    //     return response.statusText
    // }

    listenForMessages = (prompt: string,onMessage: (message: string) => void, onError?: (error: any) => void) => {
        const eventSource = new EventSource(`/api/geminiAI?prompt=${prompt}` ,);
        eventSource.onmessage = (event) => {
            const newMessage = JSON.parse(event.data).message;
            onMessage(newMessage);
        };
        eventSource.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSource.close();
            if (onError) {
                onError(error);
            }
        };
        return eventSource;
    }
}

const geminiAIService = new GeminiAIService();
export default geminiAIService;
