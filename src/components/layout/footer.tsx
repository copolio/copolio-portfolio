export function Footer() {
  return (
    <footer className="border-t py-8 text-center text-sm text-muted-foreground">
      <div className="max-w-4xl mx-auto px-4">
        &copy; {new Date().getFullYear()} Kijung Kim. All rights reserved.
      </div>
    </footer>
  );
}
