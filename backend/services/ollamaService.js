const askOllama = async (prompt) => {
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "llama3.1:8b",
      prompt,
      stream: false,
    }),
  });
  const data = await response.json();

  return data.response;
};

export default askOllama;
