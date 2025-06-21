
export const submitPipeline = async (nodes, edges) => {
  try {
    const response = await fetch("http://localhost:8000/pipelines/parse", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nodes, edges }),
    });
    
    if (!response.ok) {
      throw new Error('Failed to submit pipeline');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting pipeline:', error);
    throw error;
  }
};
