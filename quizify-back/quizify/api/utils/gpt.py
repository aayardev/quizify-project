import os
import openai
import json


openai.api_key = os.getenv("OPENAI_API_KEY")


functions = [
    {
        "name": "create_quiz",
        "description": "Generate 4 random hard mcq question about a topic.",
        "parameters": {
            "type": "object",
            "properties": {
                "questions": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "question": {
                                "type": "string",
                                "description": "question",
                            },
                            "answer": {
                                "type": "string",
                                "description": "answer",
                            },
                            "option1": {
                                "type": "string",
                                "description": "option1",
                            },
                            "option2": {
                                "type": "string",
                                "description": "option2",
                            },
                            "option3": {
                                "type": "string",
                                "description": "option3",
                            },
                        },
                        "required": [
                            "question",
                            "answer",
                            "option1",
                            "option2",
                            "option3",
                        ],
                    },
                },
                # "title": {"type": "string", "description": "title of the quiz"},
                # "description": {"type": "string", "description": "describe the quiz"},
            },
        },
    }
]


# https://github.com/tanchongmin/strictjson
def create_chat_completion(
    system_prompt,
    user_prompt,
):
    for _ in range(5):
        # Use OpenAI to get a response
        response = openai.ChatCompletion.create(
            temperature=1,
            model="gpt-3.5-turbo",
            messages=[
                {
                    "role": "system",
                    "content": system_prompt,
                },
                {"role": "user", "content": str(user_prompt)},
            ],
            functions=functions,
            function_call={"name": functions[0]["name"]},
        )

        res = response["choices"][0]["message"]["function_call"]["arguments"]

        # try-catch block to ensure output format is adhered to
        try:
            output = json.loads(res)
            return output["questions"]
        except Exception as e:
            print("An exception occurred:", str(e))
            print("Current invalid json format:", res)

    return {}
