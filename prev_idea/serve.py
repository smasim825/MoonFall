import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = os.path.join(os.path.dirname(os.path.abspath(__file__)), "ExportFiles")

class UnityWebGLHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Access-Control-Allow-Origin", "*")
        super().end_headers()

    def guess_type(self, path):
        if path.endswith(".br"):
            base_path = path[:-3]
            mime_type = super().guess_type(base_path)
            if base_path.endswith(".wasm"):
                return "application/wasm"
            elif base_path.endswith(".js"):
                return "application/javascript"
            elif base_path.endswith(".data"):
                return "application/octet-stream"
            return mime_type
        return super().guess_type(path)

    def send_head(self):
        path = self.translate_path(self.path)
        if path.endswith(".br"):
            # Set Content-Encoding: br
            ctype = self.guess_type(path)
            try:
                f = open(path, 'rb')
            except OSError:
                self.send_error(404, "File not found")
                return None
            try:
                fs = os.fstat(f.fileno())
                self.send_response(200)
                self.send_header("Content-Type", ctype)
                self.send_header("Content-Encoding", "br")
                self.send_header("Content-Length", str(fs[6]))
                self.send_header("Last-Modified", self.date_time_string(fs.st_mtime))
                self.end_headers()
                return f
            except Exception:
                f.close()
                raise
        return super().send_head()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else PORT
    with socketserver.TCPServer(("", port), UnityWebGLHandler) as httpd:
        print(f"Serving Unity WebGL from {DIRECTORY} at http://localhost:{port}")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")
