import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { toast } = useToast();

  const tags = ["Digital Art", "Portrait", "Fantasy", "Abstract", "Traditional"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Success!",
      description: "Your artwork has been uploaded successfully!",
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl mb-4 text-primary pixel-text-shadow" data-testid="text-upload-title">
          Share Your Art
        </h1>
        <p className="text-lg opacity-80" data-testid="text-upload-subtitle">
          Upload your artwork to share with the community
        </p>
      </div>

      <div className="art-post-card rounded-lg p-8">
        <form onSubmit={handleSubmit} data-testid="form-upload-art">
          <div className="mb-6">
            <Label htmlFor="title" className="block text-sm mb-2 text-primary">
              Art Title
            </Label>
            <Input 
              type="text" 
              id="title" 
              name="title" 
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
              placeholder="Enter artwork title"
              data-testid="input-title"
              required 
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="artistName" className="block text-sm mb-2 text-primary">
              Your Name
            </Label>
            <Input 
              type="text" 
              id="artistName" 
              name="artistName" 
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors" 
              placeholder="Your artist name"
              data-testid="input-artist-name"
              required 
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="description" className="block text-sm mb-2 text-primary">
              Description
            </Label>
            <Textarea 
              id="description" 
              name="description" 
              rows={4} 
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none" 
              placeholder="Describe your artwork..."
              data-testid="textarea-description"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="artFile" className="block text-sm mb-2 text-primary">
              Upload Your Artwork
            </Label>
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
              <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
              <p className="text-sm opacity-80 mb-2">Drag and drop your image here, or</p>
              <input 
                type="file" 
                id="artFile" 
                name="artFile" 
                accept="image/*" 
                className="hidden"
                data-testid="input-art-file"
                required 
              />
              <Button 
                type="button" 
                onClick={() => document.getElementById('artFile')?.click()} 
                className="retro-gradient px-4 py-2 rounded-lg text-sm"
                data-testid="button-choose-file"
              >
                Choose File
              </Button>
            </div>
          </div>

          <div className="mb-6">
            <Label className="block text-sm mb-2 text-primary">Tags (Optional)</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {tags.map(tag => (
                <button 
                  key={tag}
                  type="button" 
                  className={`px-3 py-1 rounded-full text-xs transition-colors ${
                    selectedTags.includes(tag) 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-700 hover:bg-primary'
                  }`}
                  onClick={() => toggleTag(tag)}
                  data-testid={`button-tag-${tag.toLowerCase().replace(' ', '-')}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full retro-gradient py-3 rounded-lg text-lg hover:opacity-90 transition-opacity"
            data-testid="button-submit-art"
          >
            <i className="fas fa-share mr-2"></i>
            Share Your Art
          </Button>
        </form>
      </div>
    </div>
  );
}
