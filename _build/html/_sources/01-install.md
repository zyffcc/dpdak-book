# 01 Install and Launch DPDAK

This page shows how to run DPDak on Windows, macOS, and Linux.

- Windows: try Quick start first (double-click launcher).
- macOS/Linux: go directly to Method 2 (system Python).

If the Windows quick start doesn’t work or reports missing packages, use Method 2.

## Method 1: Just open it! (Windows)

- Download: <https://drive.google.com/file/d/1yzQ5yiSzOOpMbsBrwHcBqy4c5_rv4EB4/view?usp=sharing>
- Unzip, then double-click `dpdak.bat` in the folder. The DPDAK UI should open.


```{figure} images/01-install/${curr4ntFi10/23/20254Npm324No41761237121133t}-${y4pmr}${32ont6}${4pmt4}-${06}${32}${01}.png
:width: 30%
:name: fig-dpdak-first-open
DPDAK first launch.
```

If it doesn’t start or reports missing packages, use the Python-based method below.

---

## Method 2: Run with a system Python environment (Windows/macOS/Linux)

- Download: <https://drive.google.com/file/d/1yzQ5yiSzOOpMbsBrwHcBqy4c5_rv4EB4/view?usp=sharing>
- Unzip the archive, open a terminal, and change into the `DPDAK_WIN_64bit__V1_5_0` folder.

macOS/Linux: start here. Windows: use this if Quick start doesn’t work.

Create an isolated virtual environment, install the required packages, and start DPDAK via a small launcher script. This keeps your system clean and is easy to reproduce.

### 0) Install Python (Windows only)

If you already have Python installed, please skip to {ref}`Create and activate a virtual environment <venv-create-activate>`. On macOS/Linux, Python is typically preinstalled—skip to Step 1.

1) Go to <https://www.python.org/downloads/windows/>

2) Download “Windows installer (64-bit)”.

3) Run the installer. Check “Add Python to PATH” at the bottom, then click “Install Now”.

4) Open Windows PowerShell and verify:

```powershell
python --version
```

You should see a version like `Python 3.11.x`.

(venv-create-activate)=
### 1) Create and activate a virtual environment

In your DPDAK folder, run the commands for your OS:

`````{tab-set}
````{tab-item} Windows (PowerShell)
:sync: windows

```powershell
# Create venv
python -m venv .venv

# Activate (PowerShell)
./.venv/Scripts/Activate.ps1

```
````

````{tab-item} macOS / Linux (bash/zsh)
:sync: unix

```bash
# Create venv (use python3 on most systems)
python3 -m venv .venv

# Activate (bash/zsh)
source ./.venv/bin/activate

# If 'python3' is not found, try 'python'
# python -m venv .venv
```
````
`````

You should see `(.venv)` at the start of the prompt after activation.

### 2) Upgrade pip and build tools

```powershell
python -m pip install --upgrade pip setuptools wheel
```

If 'python' isn’t found on macOS/Linux, use 'python3 -m pip' instead.

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
    "image":      "PIL.Image",
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


