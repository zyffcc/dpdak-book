# 02 Quick Start

This page gives you a minimal, working DPDAK workflow and explains the core logic:

- DPDAK is module-based; modules are chained into a “workflow”.
- A minimal workflow is typically: data input (Image Logger) → visualization (Image Display) → analysis modules.
- You can add/remove/reorder modules and re-run; the right-hand display updates accordingly.

---

## 1) Open the Plugins panel

Locate the Plugins button in the main window.

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm115No51761315078622t}-${y5pmr}${11ont4}${5pmt5}-${04}${11}${18}.png
:width: 25%
:name: fig-qs-plugin-button
Plugins button location
```

Click it to open the Plugins/workflow manager.

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm125No51761315169683t}-${y5pmr}${12ont4}${5pmt5}-${04}${12}${49}.png
:width: 25%
:name: fig-qs-plugin-opened
Plugins panel opened
```

---

## 2) Build the minimal workflow: import GISAXS data

- Add a new module to the workflow and choose Image Logger as the data input module.
- Image Logger loads your GISAXS image data.

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm245No51761315856892t}-${y5pmr}${24ont4}${5pmt5}-${04}${24}${16}.png
:width: 25%
:name: fig-qs-add-image-logger
Add the Image Logger module
```

Keep the default parameters and click OK.

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm255No51761315932837t}-${y5pmr}${25ont4}${5pmt5}-${04}${25}${32}.png
:width: 25%
:name: fig-qs-image-logger-ok
Image Logger parameters: click OK
```

Now the Image Logger module appears in the workflow. Use its top area to select the data path: click Browse and point to your data folder.

```{tip}
To quickly preview the loaded data, use the menu Tools → Image Display to open the image display dialog.
```

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm335No51761316390888t}-${y5pmr}${33ont4}${5pmt5}-${04}${33}${10}.png
:width: 25%
:name: fig-qs-image-display-open
Open a quick preview with Tools → Image Display
```

---

## 3) Select a sequence and run

- For P03 data, filenames commonly include a sequence suffix (e.g., 00005, 00006 …).
- In the Image Logger Sequence field, enter the index you want to display (e.g., 10).
- Click the Run arrow at the top.
- When asked whether to process all files, choose No (only process the current selection).
- The right-hand display updates to the image for 00010.

```{note}
If nothing updates, verify the data directory in Image Logger and that the entered sequence actually exists.
```

---

## 4) Tweak display settings (log colorbar, rotation, …)

In the Image Display dialog, click Config to adjust:

- Colorbar range and scale (Log is commonly used for scattering images).
- Image rotation angle.
- Other rendering options (contrast, crop range, etc.).

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm415No51761316887276t}-${y5pmr}${41ont4}${5pmt5}-${04}${41}${27}.png
:width: 25%
:name: fig-qs-display-config
Display Config (log color scale and rotation)
```

---

## Wrap-up and what’s next

On the image display, the axes are in pixels. For scattering we ultimately want $I(q)$, so we must map detector pixels to the scattering vector components $q_x$, $q_y$, $q_z$.

### From pixels to q (GISAXS geometry)

```{figure} images/02-quickstart/${curr5ntFi10/24/20255Npm115No51761318664563t}-${y5pmr}${11ont5}${5pmt5}-${05}${11}${04}.png
:width: 25%
:name: fig-qs-gisaxs-geometry
GISAXS geometry and angles
```

Using the incident and exit angles ($\alpha_i$, $\alpha_f$) and the in-plane scattering angle ($2\theta_f$), the scattering vector is:

$$
\vec{q} = \vec{k}_f - \vec{k}_i = \frac{2\pi}{\lambda}
\begin{pmatrix}
\cos\alpha_f\,\cos(2\theta_f) - \cos\alpha_i \\
\cos\alpha_f\,\sin(2\theta_f) \\
\sin\alpha_f + \sin\alpha_i
\end{pmatrix}
=
\begin{pmatrix}
q_x \\
q_y \\
q_z
\end{pmatrix}.
$$

### How pixel positions relate to angles

- Let $L$ be the sample–detector distance, $p_x/p_y$ the detector pixel sizes, and $(\Delta x, \Delta y)$ the pixel offset from the beam center. Then on the detector plane the metric offsets are $\Delta X = \Delta x\cdot p_x$ and $\Delta Y = \Delta y\cdot p_y$.
- For small angles, a practical approximation is:
	- in-plane angle: $2\theta_f \approx \arctan(\Delta X / L)$
	- out-of-plane exit angle: $\alpha_f \approx \arctan(\Delta Y / L)$
- The incidence angle $\alpha_i$ is set by the sample tilt during GISAXS.

With ($\alpha_i$, $\alpha_f$, $2\theta_f$) and the wavelength $\lambda$, you can compute $q_x$, $q_y$, $q_z$ for every pixel, and then obtain $I(q)$ by binning/integration.

### Calibrate L and the beam center

The exact L and beam center are rarely known precisely from a ruler. In practice you calibrate them using a standard with known scattering peak positions (q or d). By fitting the observed ring/peak positions to the known values, you solve for L (and optionally detector tilt/rotation, incidence angle, etc.).

### Common standards and sources

<div class="scroll-table small">

| SAXS: AgBeh | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Peak $q$ (Å$^{-1}$) | 0.1076 | 0.2152 | 0.3228 | 0.4304 | 0.5380 | 0.6456 | 0.7532 | 0.8608 | 0.9684 | 1.076 | 1.184 |
</div>

Source: https://gisaxs.com/index.php/Material:Silver_behenate

<div class="scroll-table small">

|WAXS: LaB$_6$| 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Peak $q$ (Å$^{-1}$) | 1.5115 | 2.1359 | 2.6160 | 3.0207 | 3.3772 | 3.6995 | 4.2719 | 4.5310 | 4.7761 | 5.0092 | 5.232 |
</div>

Source: https://gisaxs.com/index.php/Material:Lanthanum_boride

<div class="scroll-table small">

| WAXS: CeO$_2$ | 1 | 2 | 3 | 4 | 5 | 6 |
| --- | --- | --- | --- | --- | --- | --- |
| Peak $q$ (Å$^{-1}$) | 2.015 | 2.326 | 3.288 | 3.854 | 4.025 | 4.647 |
</div>

Source: https://gisaxs.com/index.php/Material:Cerium_oxide

Notes:
- Exact peak positions can vary slightly with temperature, wavelength, and instrument alignment.