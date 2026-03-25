import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import { useSearchParams } from "react-router-dom";

export const FilterBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searching = searchParams.get("search") || "";
  const author = searchParams.get("author") || "";

  const handleSearchChange = (value: string) => {
    setSearchParams({
      search: value,
      author,
    });
  };

  const handleAuthorChange = (value: string) => {
    setSearchParams({
      search: searching,
      author: value,
    });
  };

  const clearFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between mb-6">
      {/* Search */}
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />

        <Input
          placeholder="Search posts..."
          value={searching}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="pl-9 bg-background border-border text-foreground placeholder:text-muted-foreground"
        />
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        <Input
          placeholder="Filter by author"
          value={author}
          onChange={(e) => handleAuthorChange(e.target.value.trim())}
          className="bg-background border-border text-foreground placeholder:text-muted-foreground w-40"
        />

        <Button
          variant="outline"
          className="gap-2 cursor-pointer"
          onClick={clearFilters}
        >
          <X className="size-4" />
          Clear
        </Button>
      </div>
    </div>
  );
};
