# 06 Fitting — Extracting Structural Information

This chapter shows how to go from GISAXS/SAXS images to quantitative structural parameters using model-based fitting. Because of the phase problem, we generally cannot invert a scattering pattern directly into the real-space density. Instead, we assume a physically reasonable particle/structure model (sphere, cylinder, ellipsoid, etc.) and fit its parameters (radius, height, aspect ratio, polydispersity, structure factor) to the measured data.

We cover two routes:

- 1D fitting of line cuts near the Yoneda band (SAXS-like regime)
- 2D model-based GISAXS fitting (DWBA) with external tools

```{note}
If you have not prepared 1D cuts yet, see 04 Horizontal and Vertical Cuts. For time series, see 05 In‑situ Processing.
```

---

## SAXS-like fitting in Yoneda Peak

In the framework of the Distorted Wave Born Approximation (DWBA), the total scattered amplitude is the coherent sum of four paths:

```{figure} images/06-fitting/DWBAFourTermSchem.png
:width: 25%
:name: fig-06-fitting-DWBAFourTermSchem
DWBA components: transmitted/reflected combinations of incident/exit waves
```

$$
F(\mathbf{q}) = T_i T_f F_{00} + T_i R_f F_{01} + R_i T_f F_{10} + R_i R_f F_{11},
$$

where (roughly) the first term corresponds to transmitted–transmitted (SAXS-like) and the others involve one or two reflections. At the Yoneda condition (exit angle $\alpha_f = \alpha_c$, the critical angle), the Fresnel transmission $T_f$ is maximized and the reflectivity $R_f$ drops just above $\alpha_c$ (and approaches 1 just below $\alpha_c$):

$$
|T_f|^2 \gg |R_f|^2.
$$


```{figure} images/06-fitting/YonedaPeakTheory.png
:width: 25%
:name: fig-06-fitting-YonedaPeakTheory
Reflectivity/transmission near the Yoneda peak: the transmission enhances at $\alpha_c$, making the SAXS term dominant.
```


Two incident-angle regimes at the Yoneda exit angle ($\alpha_f \approx \alpha_c$):

- Case 1: $\alpha_i \approx \alpha_c$. Then $T_i$ is maximal and $R_i$ is small; with $T_f$ maximal and $R_f$ small above $\alpha_c$, $A_{00}$ ($T_i T_f F_{00}$) dominates.
- Case 2: $\alpha_i > \alpha_c$. Then $T_i \approx 1$ (no enhancement) and $R_i$ is small; with $T_f$ maximal and $R_f$ small, $A_{00}$ still dominates.

Hence, for $\alpha_i \gtrsim \alpha_c$ and $\alpha_f \approx \alpha_c$, the first term dominates and the intensity reduces to the Born expression:

$$
I(\mathbf{q}) \approx |F_{00}|^2 \propto |F(\mathbf{q})|^2,
$$

which justifies using standard SAXS form-factor/structure-factor models to fit horizontal cuts taken close to the Yoneda band.

```{note}
If $\alpha_i < \alpha_c$ (sub‑critical incidence), $R_i \approx 1$ and $T_i$ is small; in that case the terms containing $R_i$ ($A_{10}$, $A_{11}$) may not be negligible, and a full DWBA model is safer.
```

---

## 1) Prepare a clean 1D curve (background and normalization)

For reliable fitting, first obtain a background-subtracted, normalized 1D line profile.

What you need:

- Sample image(s): e.g. `exp_data/single_data/jg_4nm_au_bs_00001.cbf`
- Background image(s) measured on a clean substrate (GISAXS): e.g. `background_Silicon/silicon_00004_00001.cbf`
- Exposure time and incident flux (I0) for normalization

Steps:


1. Subtract the substrate/background curve: $I_\text{sub} = I_\text{sample} - k\, I_\text{bg}$.
	- For the example data a practical choice is: $I_\text{sub} = I_{\mathrm{bs}} - 5\times 0.95\; I_{\mathrm{bg}}$.

2. Create a horizontal cut near the Yoneda band (see 04).
	- If you know the particle shape (e.g., spheres), you can fine‑tune the scale $k$ by enforcing Porod behavior at high $q$.

3. Export the clean 1D curve as ASCII (dat). You can use Export → DB Text Export.


---

## 2) Fit the 1D curve in SasView (recommended)

SasView provides many form factors (sphere, cylinder, ellipsoid, core‑shell) and structure factors (hard‑sphere, sticky‑hard‑sphere, etc.). Workflow:

1. Import the exported dat file.
2. Choose a model (e.g., Sphere) and, if needed, a structure factor.
3. Set wavelength/scale if required by the model definition.
4. Add polydispersity where appropriate (radius distribution, etc.).
5. Fit and inspect: peak positions (mean spacing), widths (correlation lengths), scaling (volume fraction/contrast).

Link: https://www.sasview.org/


---

## 3) 2D model-based GISAXS fitting (DWBA)

For full 2D fits including refraction and multiple scattering channels, use DWBA‑based tools such as BornAgain. Define layers (substrate, film), particles (shape, size, distributions), and instrument geometry; then simulate and fit the 2D pattern.

Link: https://www.bornagainproject.org/

```{tip}
Start from your calibrated geometry (03 Calibration) and the ROI definitions used for 1D cuts (04). Use masks for beamstop and bad pixels.
```
