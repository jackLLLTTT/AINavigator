import { users, tools, type User, type InsertUser, type Tool, type InsertTool } from "@shared/schema";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllTools(): Promise<Tool[]>;
  getToolsByCategory(category: string): Promise<Tool[]>;
  searchTools(query: string): Promise<Tool[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private tools: Map<number, Tool>;
  private currentUserId: number;
  private currentToolId: number;

  constructor() {
    this.users = new Map();
    this.tools = new Map();
    this.currentUserId = 1;
    this.currentToolId = 1;
    this.initializeTools();
  }

  private initializeTools() {
    const staticTools: InsertTool[] = [
      {
        name: "ChatGPT",
        description: "强大的对话式AI助手，能够回答问题、协助写作、编程等多种任务",
        url: "https://chat.openai.com",
        category: "text",
        tags: ["对话", "写作", "编程"],
        rating: 4.9,
        pricing: "免费",
        logo: "GP",
        isOnline: true,
      },
      {
        name: "Claude",
        description: "Anthropic开发的AI助手，擅长分析、写作和复杂推理任务",
        url: "https://claude.ai",
        category: "text",
        tags: ["分析", "推理", "写作"],
        rating: 4.8,
        pricing: "付费",
        logo: "CL",
        isOnline: true,
      },
      {
        name: "Midjourney",
        description: "顶级AI图像生成工具，通过文本描述创建高质量的艺术作品",
        url: "https://midjourney.com",
        category: "image",
        tags: ["艺术", "设计", "创意"],
        rating: 4.9,
        pricing: "付费",
        logo: "MD",
        isOnline: true,
      },
      {
        name: "Stable Diffusion",
        description: "开源的AI图像生成模型，可本地部署和自定义训练",
        url: "https://stability.ai",
        category: "image",
        tags: ["开源", "本地", "可定制"],
        rating: 4.6,
        pricing: "免费",
        logo: "SD",
        isOnline: true,
      },
      {
        name: "GitHub Copilot",
        description: "GitHub推出的AI编程助手，实时代码建议和自动补全",
        url: "https://github.com/features/copilot",
        category: "code",
        tags: ["编程", "自动补全", "多语言"],
        rating: 4.7,
        pricing: "付费",
        logo: "CP",
        isOnline: true,
      },
      {
        name: "Tabnine",
        description: "AI代码自动完成工具，支持多种编程语言和IDE集成",
        url: "https://tabnine.com",
        category: "code",
        tags: ["AI补全", "IDE集成", "团队协作"],
        rating: 4.4,
        pricing: "免费试用",
        logo: "TB",
        isOnline: true,
      },
      {
        name: "ElevenLabs",
        description: "先进的AI语音合成和克隆技术，生成自然流畅的语音",
        url: "https://elevenlabs.io",
        category: "audio",
        tags: ["语音合成", "声音克隆", "多语言"],
        rating: 4.8,
        pricing: "付费",
        logo: "EL",
        isOnline: true,
      },
      {
        name: "Runway ML",
        description: "AI视频生成和编辑平台，支持文本生成视频和视频特效",
        url: "https://runwayml.com",
        category: "video",
        tags: ["视频生成", "特效", "编辑"],
        rating: 4.5,
        pricing: "付费",
        logo: "RW",
        isOnline: true,
      },
      {
        name: "Jasper AI",
        description: "专业的AI营销内容生成工具，帮助创建博客、广告和营销文案",
        url: "https://jasper.ai",
        category: "business",
        tags: ["营销", "文案", "博客"],
        rating: 4.3,
        pricing: "付费",
        logo: "JA",
        isOnline: true,
      },
      {
        name: "Perplexity AI",
        description: "AI驱动的搜索引擎，提供准确的答案和引用来源",
        url: "https://perplexity.ai",
        category: "research",
        tags: ["搜索", "研究", "引用"],
        rating: 4.7,
        pricing: "免费",
        logo: "PE",
        isOnline: true,
      },
      {
        name: "Notion AI",
        description: "集成在Notion中的AI助手，帮助写作、总结和内容生成",
        url: "https://notion.so",
        category: "text",
        tags: ["笔记", "写作", "总结"],
        rating: 4.4,
        pricing: "付费",
        logo: "NO",
        isOnline: true,
      },
    ];

    staticTools.forEach(tool => {
      const id = this.currentToolId++;
      this.tools.set(id, { ...tool, id });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllTools(): Promise<Tool[]> {
    return Array.from(this.tools.values());
  }

  async getToolsByCategory(category: string): Promise<Tool[]> {
    return Array.from(this.tools.values()).filter(tool => tool.category === category);
  }

  async searchTools(query: string): Promise<Tool[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.tools.values()).filter(tool => 
      tool.name.toLowerCase().includes(lowerQuery) ||
      tool.description.toLowerCase().includes(lowerQuery) ||
      tool.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }
}

export const storage = new MemStorage();
