import { cn } from "@/lib/utils";

interface ContainerProps {
    children: React.ReactNode;
    className?: string;
}

export function Container({ children, className }: ContainerProps) {
    return (
        <div className={cn("mx-auto max-w-3xl px-6 sm:px-8", className)}>
            {children}
        </div>
    );
}
