import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

export default function CurrentlyLearning() {
  const currentlyLearning = [
    { name: "System Design", row: 1 },
    { name: "Bitcoin Programming", row: 1 },
    { name: "Svelte", row: 2 },
    { name: "Elixir", row: 2 },
    { name: "NestJS", row: 2 }
  ];

  return (
    <section className="py-12 px-6 bg-primary/5">
      <div className="max-w-4xl mx-auto">
        <Card className="p-8 md:p-10 bg-card/90 backdrop-blur border-primary/30">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2" data-testid="text-currently-learning-heading">
                Currently Learning
              </h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Always exploring new technologies and expanding my skill set
              </p>
              <div className="flex flex-col gap-2">
                <div className="flex flex-wrap gap-2 justify-start">
                  {currentlyLearning.filter(tech => tech.row === 1).map((tech, index) => (
                    <Badge 
                      key={index}
                      variant="outline" 
                      className="border-primary/30 hover-elevate"
                      data-testid={`badge-learning-${index}`}
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2 justify-start">
                  {currentlyLearning.filter(tech => tech.row === 2).map((tech, index) => (
                    <Badge 
                      key={index + 2}
                      variant="outline" 
                      className="border-primary/30 hover-elevate"
                      data-testid={`badge-learning-${index + 2}`}
                    >
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
