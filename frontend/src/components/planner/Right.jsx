import { useState } from "react";
import { fetchGemmaResponse } from "../../lib/api";
import { set } from "date-fns";

function Right({ start, end, setStart, setEnd, onReplan }) {
  const [days, setDays] = useState('');
  const [people, setPeople] = useState('');
  const [budget, setBudget] = useState('');
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(null);

  const tokenCount = prompt.split(' ').length;

  const handleSubmit = async () => {
    setIsLoading(true);
    setOutput(null);

    const inputMessage = `
      Start: ${start}
      End: ${end}
      No. of Days: ${days}
      No. of People: ${people}
      Budget: ${budget}
      Prompt: ${prompt}
    `;

    // try {
    //   const response = await fetch('/api/gemma', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ prompt: inputMessage })
    //   });

    //   const result = await response.json();
    //   setOutput(result);
    // } catch (error) {
    //   console.error('Error:', error);
    //   setOutput({ error: 'Something went wrong.' });
    // } finally {
    //   setIsLoading(false);
    // }

    const results = await fetchGemmaResponse(inputMessage);
    setOutput(results);
    setIsLoading(false);
  };

  return (
    <div className="p-6 w-full max-w-xl space-y-4 bg-white rounded-xl shadow-lg">
      <div>
        <label className="block text-sm font-semibold">Start Location</label>
        <input value={start} onChange={e => setStart(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">End Location</label>
        <input value={end} onChange={e => setEnd(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">Days</label>
        <input type="number" value={days} onChange={e => setDays(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">No. of Travellers</label>
        <input type="number" value={people} onChange={e => setPeople(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">Budget (LKR)</label>
        <input type="number" value={budget} onChange={e => setBudget(e.target.value)} className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-semibold">Trip Prompt</label>
        <textarea value={prompt} onChange={e => setPrompt(e.target.value)} rows={4} className="w-full border rounded px-3 py-2" />
        <p className="text-xs text-right text-gray-500">Token count: {tokenCount}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="flex-1 bg-green-500 text-white py-2 rounded hover:bg-green-600"
        >
          {isLoading ? 'Planning trip...' : 'Generate Plan'}
        </button>

        <button
          onClick={onReplan}
          disabled={!start || !end}
          className="flex-1 bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Replan Route
        </button>
      </div>

      {isLoading && <div className="text-center text-blue-500 animate-pulse"> AI is planning your trip...</div>}

      {output && (
        <div className="mt-4 border-t pt-4 space-y-2">
          <h3 className="text-lg font-bold">Trip Insight</h3>
          {output.error ? (
            <p className="text-red-500">{output.error}</p>
          ) : (
            <>
              <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">{output.plan}</pre>
              <div>
                <h4 className="font-semibold">JSON Output</h4>
                <pre className="bg-gray-100 p-2 rounded text-xs overflow-x-auto">{JSON.stringify(output.json, null, 2)}</pre>
              </div>
              <div>
                <h4 className="font-semibold">Suggested Places</h4>
                <ul className="list-disc list-inside text-sm">
                  {output.places.map((place, index) => <li key={index}>{place}</li>)}
                </ul>
              </div>
              <p className="text-sm font-medium text-green-700">
                Total Estimated Budget for {people} people: Rs. {output.totalBudget}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Right;
