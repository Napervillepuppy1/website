import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export default function Upload() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [title, setTitle] = useState("");
  const [artistName, setArtistName] = useState("");
  const [description, setDescription] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const tags = ["Digital Art", "Portrait", "Fantasy", "Abstract", "Traditional", "Landscape", "Character Design", "Concept Art"];

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      
      toast({
        title: "File selected",
        description: `${file.name} is ready for upload`,
      });
    }
  };

  const clearPreview = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      toast({
        title: "Missing file",
        description: "Please select an artwork file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    
    toast({
      title: "Success!",
      description: "Your artwork has been uploaded successfully!",
    });
    
    // Reset form
    setTitle("");
    setArtistName("");
    setDescription("");
    setSelectedTags([]);
    clearPreview();
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 bg-gray-800 border border-gray-600 rounded-lg focus:border-primary focus:outline-none transition-colors resize-none" 
              placeholder="Describe your artwork..."
              data-testid="textarea-description"
            />
          </div>

          <div className="mb-6">
            <Label htmlFor="artFile" className="block text-sm mb-2 text-primary">
              Upload Your Artwork
            </Label>
            
            {!previewUrl ? (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-primary transition-colors">
                <i className="fas fa-cloud-upload-alt text-4xl text-gray-400 mb-4"></i>
                <p className="text-sm opacity-80 mb-2">Drag and drop your image here, or</p>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  id="artFile" 
                  name="artFile" 
                  accept="image/*" 
                  className="hidden"
                  onChange={handleFileSelect}
                  data-testid="input-art-file"
                  required 
                />
                <Button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()} 
                  className="retro-gradient px-4 py-2 rounded-lg text-sm"
                  data-testid="button-choose-file"
                >
                  Choose File
                </Button>
                <p className="text-xs opacity-60 mt-2">Supports JPG, PNG, GIF (Max 10MB)</p>
              </div>
            ) : (
              <div className="art-post-card rounded-lg p-4">
                <div className="relative">
                  <img 
                    src={previewUrl} 
                    alt="Preview" 
                    className="w-full h-64 object-cover rounded-lg mb-4"
                    data-testid="img-preview"
                  />
                  <Button
                    type="button"
                    onClick={clearPreview}
                    className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full"
                    data-testid="button-clear-preview"
                  >
                    <i className="fas fa-times"></i>
                  </Button>
                </div>
                <div className="flex items-center justify-between text-sm opacity-80">
                  <span>File: {selectedFile?.name}</span>
                  <span>Size: {selectedFile ? (selectedFile.size / 1024 / 1024).toFixed(2) : 0}MB</span>
                </div>
              </div>
            )}
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
            disabled={isUploading || !selectedFile}
            className="w-full retro-gradient py-3 rounded-lg text-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            data-testid="button-submit-art"
          >
            {isUploading ? (
              <>
                <i className="fas fa-spinner animate-spin mr-2"></i>
                Uploading...
              </>
            ) : (
              <>
                <i className="fas fa-share mr-2"></i>
                Share Your Art
              </>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
