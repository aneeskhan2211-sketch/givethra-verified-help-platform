import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import { CategoryPill } from "./CategoryPill";
import { VerificationBadge, type VerificationLevel } from "./VerificationBadge";

export interface CaseCardData {
  id: string;
  title: string;
  category: string;
  country: string;
  city: string;
  amountNeeded: number;
  amountRaised: number;
  verificationLevel: VerificationLevel;
  imageUrl?: string;
  description?: string;
}

interface Props {
  data: CaseCardData;
  onClick?: () => void;
  className?: string;
}

export function CaseCard({ data, onClick, className }: Props) {
  const progress = Math.min(
    Math.round((data.amountRaised / data.amountNeeded) * 100),
    100,
  );

  return (
    <Card
      data-ocid="case.card"
      onClick={onClick}
      className={cn(
        "overflow-hidden border border-border transition-smooth cursor-pointer group hover:shadow-md hover:-translate-y-0.5",
        className,
      )}
    >
      {data.imageUrl && (
        <div className="aspect-[16/9] overflow-hidden bg-muted">
          <img
            src={data.imageUrl}
            alt={data.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <VerificationBadge level={data.verificationLevel} />
          <CategoryPill category={data.category} />
        </div>
        <h3 className="font-display font-semibold text-foreground leading-snug line-clamp-2">
          {data.title}
        </h3>
        {data.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {data.description}
          </p>
        )}
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3 shrink-0" />
          <span className="truncate">
            {data.city}, {data.country}
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs">
            <span className="text-muted-foreground">Funds needed</span>
            <span className="font-semibold text-foreground">
              ${data.amountNeeded.toLocaleString()}
            </span>
          </div>
          <Progress value={progress} className="h-1.5" />
          <div className="text-xs text-muted-foreground text-right">
            {progress}% raised
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
