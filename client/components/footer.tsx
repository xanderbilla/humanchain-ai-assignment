"use client";

export function Footer() {
  return (
    <footer className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto border-t px-4 py-4">
        <div className="flex items-center justify-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AI Safety Incident Log | Developed by
            Vikas
          </p>
        </div>
      </div>
    </footer>
  );
}
