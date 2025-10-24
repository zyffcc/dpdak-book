# 01 Install and Launch DPDAK

This page shows how to download and start DPDak on Windows. If double-click startup fails, use the system Python method below. All commands are for Windows PowerShell.

## Quick start

- Download: <https://drive.google.com/file/d/1yzQ5yiSzOOpMbsBrwHcBqy4c5_rv4EB4/view?usp=sharing>
- Unzip, then double-click `dpdak.bat` in the folder. The DPDAK UI should open.


```{figure} images/01-install/${curr4ntFi10/23/20254Npm324No41761237121133t}-${y4pmr}${32ont6}${4pmt4}-${06}${32}${01}.png
:width: 30%
:name: fig-dpdak-first-open
DPDAK first launch.
```

If it doesn’t start or reports missing packages, use the Python-based method below.

---

## Method 2: Run with a system Python environment

Create an isolated virtual environment, install the required packages, and start DPDAK via a small launcher script. This keeps your system clean and is easy to reproduce.

### 0) Install Python 

If you already have Python installed, please ignore this

1) Go to <https://www.python.org/downloads/windows/>

2) Download “Windows installer (64-bit)”.

3) Run the installer. Check “Add Python to PATH” at the bottom, then click “Install Now”.

4) Open Windows PowerShell and verify:

```powershell
python --version
```

You should see a version like `Python 3.11.x`.

### 1) Create and activate a virtual environment

In your DPDAK folder (**PowerShell Terminal**, You can open it by searching for PowerShell.), run:

```powershell
# Create venv
python -m venv .venv

# Activate (PowerShell)
./.venv/Scripts/Activate.ps1

# If blocked by execution policy, allow scripts for this session first:
# Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
```

You should see `(.venv)` at the start of the prompt after activation.

### 2) Upgrade pip and build tools

```powershell
python -m pip install --upgrade pip setuptools wheel
```

### 3) Install required packages

```powershell
pip install numpy scipy wxpython networkx matplotlib pillow fabio pyfai h5py
```

### 4) Verify installation

```powershell
python -c "import numpy, scipy, wx, networkx, matplotlib, PIL, fabio, pyFAI, h5py; print('All OK!')"
```

- Seeing `All OK!` means dependencies are ready.
- If `wx` fails to import, prefer Python 3.10–3.12. Wheels for other versions may be unavailable.

### 5) Compatibility patch + launcher

In the directory that contains `main.py`, create a file named `run_dpdak.py` with the content below (UTF‑8 encoding):

```python
import sys, threading, importlib

# === 1) Compatibility: old top-level PIL module names ===
# Map legacy imports (Image, ImageFont, etc.) to Pillow equivalents.
_aliases = {
	"Image":      "PIL.Image",
	"ImageFont":  "PIL.ImageFont",
	"ImageDraw":  "PIL.ImageDraw",
	"ImageFilter":"PIL.ImageFilter",
}
for k, v in _aliases.items():
	try:
		sys.modules.setdefault(k, importlib.import_module(v))
	except Exception:
		pass

# === 2) Compatibility: Python 2 → 3 threading API ===
# Add aliases for methods that were renamed in Python 3.
Thread = threading.Thread
if hasattr(Thread, "is_alive") and not hasattr(Thread, "isAlive"):
	Thread.isAlive = Thread.is_alive
if not hasattr(Thread, "getName"):
	Thread.getName = lambda self: self.name
if not hasattr(Thread, "setName"):
	Thread.setName = lambda self, name: setattr(self, "name", name)
if not hasattr(Thread, "isDaemon"):
	Thread.isDaemon = lambda self: self.daemon
if not hasattr(Thread, "setDaemon"):
	Thread.setDaemon = lambda self, x: setattr(self, "daemon", x)
if not hasattr(Thread, "getDaemon"):
	Thread.getDaemon = lambda self: self.daemon

# === 3) Compatibility: pyFAI module name change (since 2024.10) ===
# Map old 'pyFAI.azimuthalIntegrator' to the new 'pyFAI.integrator.azimuthal'.
try:
	import pyFAI
	_new_mod = importlib.import_module("pyFAI.integrator.azimuthal")
	sys.modules.setdefault("pyFAI.azimuthalIntegrator", _new_mod)
	if not hasattr(pyFAI, "azimuthalIntegrator"):
		setattr(pyFAI, "azimuthalIntegrator", _new_mod)
except Exception:
	# Ignore if running with an older pyFAI version.
	pass

# === 4) Launch the original DPDAK main script ===
with open("main.py", "rb") as f:
	code = compile(f.read(), "main.py", "exec")
exec(code, {"__name__": "__main__"})
```

Run it:

```powershell
python run_dpdak.py
```

DPDAK should start. Use this command next time as well (activate the venv first).

> If your `main.py` is in a different location, place `run_dpdak.py` alongside it, or adjust the script to read the correct path to `main.py`.

