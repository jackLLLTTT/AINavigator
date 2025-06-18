import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Header from "@/components/header";
import CategoryFilter from "@/components/category-filter";
import StatsSection from "@/components/stats-section";
import ToolsGrid from "@/components/tools-grid";
import Footer from "@/components/footer";
import type { Tool } from "@shared/schema";

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: tools = [], isLoading } = useQuery<Tool[]>({
    queryKey: ["/api/tools"],
  });

  const filteredTools = useMemo(() => {
    let filtered = tools;

    // Apply category filter
    if (activeCategory !== "all") {
      filtered = filtered.filter(tool => tool.category === activeCategory);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "popular":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      case "name":
        filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "rating":
        filtered = [...filtered].sort((a, b) => b.rating - a.rating);
        break;
      default: // newest
        break;
    }

    return filtered;
  }, [tools, activeCategory, searchQuery, sortBy]);

  const stats = useMemo(() => ({
    totalTools: tools.length,
    categories: 8,
    weeklyUpdates: 15,
    users: 50000,
  }), [tools.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryFilter 
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      <StatsSection stats={stats} />
      <ToolsGrid 
        tools={filteredTools}
        isLoading={isLoading}
        activeCategory={activeCategory}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <Footer />
    </div>
  );
}
