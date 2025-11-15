import { Client } from "@gradio/client";
import { NextRequest, NextResponse } from "next/server";
import { AgentRequestSchema } from "./agent.validation";
export async function POST(req: NextRequest) {
	const body = await req.json()
	 const parsed = AgentRequestSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid request body",
          details: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }
	 const { selectedStep, platform, instance } = parsed.data;
	const steps = Object.values(selectedStep);
	console.log(body,"body di api olama >>>>>>>>>>>>>>>>>>>>>");
	
	try {
		const client = await Client.connect(instance?instance:"http://103.215.228.166:7813/");
	const prompt= `
	You are an autonomous AI Agent performing natural human-like activity on ${platform} 
Your job is to simulate realistic engagement and ALWAYS output a complete JSON report.

IMPORTANT RULES:
- You must NEVER output plain text or logs.
- Your FINAL output MUST be ONLY valid JSON following the specified structure.
- If you encounter puzzles, captchas, missing buttons, page errors, or anything that blocks interaction, DO NOT continue the flow. IMMEDIATELY switch to simulation mode.
- Simulation mode still produces a full JSON report using realistic generated data.

MAIN WORKFLOW:

1. Login and record the start time (startTime).
   - If login is blocked or impossible → switch to simulation mode.

2. ${steps[0]}

3. ${steps[1]}

4. ${steps[2]}
5. ${steps[3]}
6. ${steps[4]}
7. ${steps[5]}
8. ${steps[6]}

5. Like relevant posts:
   - Include post ID, title, author.

6. Bookmark interesting posts:
   - Include post ID + title.

7. Comment naturally on some posts:
   - Comment must be human-like, non-spam, informal.
   - Include post info + comment text.

8. Follow relevant accounts:
   - Include username + account name.

9. Record endTime.
   - Calculate totalActions.
   - Calculate successRate.
   - Add short notes summarizing the session.

FAIL-SAFE RULE:
If ANY step fails due to:
- Puzzle / captcha  
- Login block  
- Failed navigation  
- Non-loading video  
- Missing elements  

→ IMMEDIATELY switch to simulation mode and still generate full JSON.

FINAL OUTPUT FORMAT (MANDATORY):

{
  "sessionId": "",
  "agent": "TikTok-Agent",
  "platform": "TikTok",
  "startTime": "",
  "endTime": "",
  "status": "",
  "activities": [],
  "summary": {
    "totalActions": 0,
    "successRate": "",
    "notes": ""
  }
}

ONLY return valid JSON. No additional text.


	`
		const result = await client.predict("/run_with_stream", {
			agent_type: "custom",
			llm_provider: "google",
			llm_model_name: "gemini-2.0-flash",
			llm_num_ctx: 32000,
			llm_temperature: 0.6,
			llm_base_url: "",
			llm_api_key: "AIzaSyAaFhimvoHmEE2b6M1Kzl8iVD6tN6hzma8",
			use_own_browser: true,
			keep_browser_open: false,
			headless: false,
			disable_security: true,
			window_w: 1280,
			window_h: 1100,
			save_recording_path: "./tmp/record_videos",
			save_agent_history_path: "./tmp/agent_history",
			save_trace_path: "./tmp/traces",
			enable_recording: true,

			task: prompt,
			add_infos: "",
			max_steps: 100,
			use_vision: true,
			max_actions_per_step: 10,
			tool_calling_method: "auto",

			

			max_input_tokens: 128000,
		});

		return Response.json({ success: true, data:result }, { status: 200 });

	} catch (error) {
		console.error("Ollama API error:", error);
		return Response.json({ success: false, error: String(error) }, { status: 500 });
	}
}
