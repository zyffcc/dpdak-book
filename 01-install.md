# 01 Install and Launch DPDAK

This page shows how to run DPDak on Windows, macOS, and Linux.

- Windows: try Quick start first (double-click launcher).
- macOS/Linux: go directly to Method 2 (system Python).

If the Windows quick start doesn’t work or reports missing packages, use Method 2.

## Method 1: Just open it! (Windows)

- Download: <https://drive.google.com/file/d/1yzQ5yiSzOOpMbsBrwHcBqy4c5_rv4EB4/view?usp=sharing>
- Unzip, then double-click `dpdak.bat` in the folder. The DPDAK UI should open.

- Example data: Google Drive folder
	https://drive.google.com/drive/folders/1Sl78Z_ynYPighNf874BKksCT4IGr0OQR?usp=sharing

```{figure} images/01-install/dpdak-first-open.png
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

### 2) Upgrade pip

```powershell
python -m pip install --upgrade pip
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

### 5) Compatibility patch + launcher

In the directory that contains `main.py`, download a patch named `run_dpdak.py` to the `DPDAK_WIN_64bit__V1_5_0` folder:

Download link: <https://drive.google.com/drive/folders/10SoGPdudpQa8YA8bT55A7-uhIBTMS54N?usp=sharing>


Run it:

```powershell
python run_dpdak.py
```

DPDAK should start. Use this command next time as well (activate the venv first).


