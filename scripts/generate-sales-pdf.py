#!/usr/bin/env python3
"""Gera um PDF leve do playbook sem dependências externas."""
from pathlib import Path
import re, textwrap
SRC=Path("docs/PLAYBOOK_COMERCIAL_GYMFLOW.md"); OUT=Path("docs/GymFlow-Playbook-Comercial.pdf")
raw=SRC.read_text(encoding="utf-8")
lines=[]
for source in raw.splitlines():
    s=source.rstrip()
    if s.startswith("---"): lines.append(("rule","")); continue
    level=len(s)-len(s.lstrip("#")) if s.startswith("#") else 0
    if level: lines.append(("h1" if level==1 else "h2" if level==2 else "h3",s[level:].strip())); continue
    if s.startswith("> "): lines.append(("quote",s[2:])); continue
    s=re.sub(r"\*\*(.*?)\*\*",r"\1",s);s=re.sub(r"`([^`]*)`",r"\1",s)
    if not s: lines.append(("space","")); continue
    lines.append(("body",s))
W,H=595,842; margin=48; pages=[]; current=[]; y=H-margin
styles={"h1":(18,26),"h2":(14,22),"h3":(11,18),"quote":(10,17),"body":(9,14),"space":(9,8),"rule":(9,12)}
def chunks(text,width):
    prefix=""
    if text.startswith("- "):prefix="• ";text=text[2:]
    if text.startswith("[ ] "):prefix="□ ";text=text[4:]
    wrapped=textwrap.wrap(prefix+text,width=width,break_long_words=False,replace_whitespace=False) or [""]
    return wrapped
for kind,text in lines:
    size,leading=styles[kind]; width=48 if kind in ("h1","h2") else 82
    rows=[""] if kind in ("space","rule") else chunks(text,width)
    needed=leading*len(rows)+(5 if kind in ("h1","h2") else 0)
    if y-needed<margin+25: pages.append(current);current=[];y=H-margin
    if kind=="rule": current.append(("rule",margin,y));y-=leading;continue
    for row in rows:
        current.append((kind,margin,y,row,size));y-=leading
    if kind in ("h1","h2"):y-=5
if current:pages.append(current)
objects=[]
def obj(data):objects.append(data);return len(objects)
font=obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>")
bold=obj(b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>")
page_ids=[]; content_ids=[]
def esc(t):
    b=t.encode("cp1252","replace");return b.replace(b"\\",b"\\\\").replace(b"(",b"\\(").replace(b")",b"\\)")
for n,page in enumerate(pages,1):
    stream=[b"0.11 0.16 0.25 rg"]
    for item in page:
        if item[0]=="rule":stream.append(f"0.80 0.83 0.88 RG {margin} {item[2]} m {W-margin} {item[2]} l S".encode());continue
        kind,x,y,text,size=item;fid=bold if kind in ("h1","h2","h3") else font
        color=b"0.31 0.27 0.90 rg" if kind in ("h1","h2") else b"0.11 0.16 0.25 rg"
        stream.extend([color,b"BT",f"/F{fid} {size} Tf {x} {y} Td (".encode()+esc(text)+b") Tj",b"ET"])
    stream.extend([b"0.45 0.49 0.57 rg",b"BT",f"/F{font} 8 Tf {margin} 24 Td (GymFlow - Playbook Comercial | ".encode()+str(n).encode()+b" de "+str(len(pages)).encode()+b") Tj",b"ET"])
    data=b"\n".join(stream);content_ids.append(obj(b"<< /Length "+str(len(data)).encode()+b" >>\nstream\n"+data+b"\nendstream"));page_ids.append(None)
pages_id=len(objects)+len(pages)+1
for i,cid in enumerate(content_ids):page_ids[i]=obj(f"<< /Type /Page /Parent {pages_id} 0 R /MediaBox [0 0 {W} {H}] /Resources << /Font << /F{font} {font} 0 R /F{bold} {bold} 0 R >> >> /Contents {cid} 0 R >>".encode())
pages_obj=obj(("<< /Type /Pages /Kids ["+" ".join(f"{x} 0 R" for x in page_ids)+f"] /Count {len(page_ids)} >>").encode());assert pages_obj==pages_id
catalog=obj(f"<< /Type /Catalog /Pages {pages_id} 0 R >>".encode())
out=bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n");offsets=[0]
for i,data in enumerate(objects,1):offsets.append(len(out));out.extend(f"{i} 0 obj\n".encode()+data+b"\nendobj\n")
xref=len(out);out.extend(f"xref\n0 {len(objects)+1}\n0000000000 65535 f \n".encode());
for x in offsets[1:]:out.extend(f"{x:010d} 00000 n \n".encode())
out.extend(f"trailer\n<< /Size {len(objects)+1} /Root {catalog} 0 R >>\nstartxref\n{xref}\n%%EOF\n".encode());OUT.write_bytes(out);print(f"Gerado {OUT} ({len(pages)} páginas, {len(out)} bytes)")
