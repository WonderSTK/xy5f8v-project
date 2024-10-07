import React from 'react';
import { Play } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setResponse } from '../utils/outputSlice'; 
import OpenAI from 'openai';
import { toast } from 'react-toastify'; // toast for notifications

const Header = () => {
  const dispatch = useDispatch();
  const prompt = useSelector((state) => state.input.prompt); 
  const apiKey = useSelector((state) => state.llm.apiKey); 

  const openai = new OpenAI({
    apiKey: apiKey, 
    dangerouslyAllowBrowser: true,
  });

  const handleRunClick = async () => {
    //if the prompt is empty
    if (!prompt) {
      toast.error("Error while running the flow: Prompt cannot be empty!");
      return; // Early return if prompt is empty
    }

    
    if (!apiKey) {
      toast.error("Error while running the flow: API key is missing!");
      return; // Early return if API key is missing
    }

    try {
      //an API call to OpenAI
      const gptSearchResult = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
      });

      // response
      const output = gptSearchResult.choices[0]?.message?.content;

      if (output) {
        // Dispatch the response to the output slice
        dispatch(setResponse(output));

        // Success notification
        toast.success("API call successful! Response received.");
      } else {
        console.error("No output received from API");
        toast.error("Error: No response from API.");
        dispatch(setResponse("Error: No response from API."));
      }
    } catch (error) {
      console.error("Error fetching response from OpenAI:", error);
      toast.error(`Error: ${error.message}`); 
      dispatch(setResponse(`Error: ${error.message}`)); 
    }
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3">
          <div className="flex items-center">
            <img
              src="https://avatars.githubusercontent.com/u/65982452?s=280&v=4"
              alt="OpenAGI Logo"
              className="h-10 w-10 mr-2"
            />
            <span className="text-xl font-semibold text-gray-900">OpenAGI</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="px-4 py-2 text-gray-700 hover:text-gray-900">
              Deploy
            </button>
            <button
              onClick={handleRunClick}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center"
            >
              <Play className="w-4 h-4 mr-2" />
              Run
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
