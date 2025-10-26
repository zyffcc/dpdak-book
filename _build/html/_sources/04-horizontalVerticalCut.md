# 04 Horizontal and Vertical Cuts

Reducing a 2D GISAXS/SAXS image to a 1D line profile is a simple way to make features visible and quantify in-plane or out-of-plane structure. In GISAXS, a common choice is a horizontal cut near the Yoneda band; for film thickness and vertical correlations, a vertical cut is useful.

```{note}
Yoneda enhancement occurs when the exit angle equals the material’s critical angle, producing a pronounced intensity band. Near this angle, the Born term dominates, so standard SAXS-like form-factor/structure-factor analysis is often applicable.
```

Physics quick ref:

- Refractive index for X-rays: $n = 1 - \delta + i\beta$. The critical angle (radians) is approximately $\theta_c \approx \sqrt{2\delta}$. Values for $\delta,\beta$ depend on energy and material.
- Look up $\delta,\beta$ and $\theta_c$ at the CXRO database: https://henke.lbl.gov/optical_constants/

---

## What you need

- Example data (if not downloaded yet in Section 03-Calibration): https://drive.google.com/drive/folders/1Sl78Z_ynYPighNf874BKksCT4IGr0OQR?usp=sharing
	- Use file: `exp_data/single_data/jg_4nm_au_bs_00001.cbf`

---

## 1) Add the required modules

- **Ensure Image Logger is in the workflow** (from STANDARD PLUGINS → data input → Image Logger).
- **Add q space (q_xy, qz)** (from DESY PLUGINS → data input) to provide q-coordinates.
- **Add Line Integration P03** (used for both horizontal and vertical cuts).

```{figure} images/04-horizontalVerticalCut/HVCutPlugins.png
:width: 25%
:name: fig-hv-plugins
Modules used for cuts: Image Logger, q space, Line Integration P03
```

---

## 2) Enter geometry in q space

You can reuse the calibrated values from chapter 03 (recommended), or enter:

- Wavelength = 1.045 Å
- Distance = 2565 mm
- Pixel size X = 172 µm, Pixel size Y = 172 µm
- Beam Center X = 791 px, Beam Center Y = 368 px
- $\alpha_i$ = 0.4°; rotation = 0; tilt = 0

**Enter these values in the q space plugin.**

```{figure} images/04-horizontalVerticalCut/qSpaceInput.png
:width: 25%
:name: fig-qspace-input
Enter beamline geometry in the q space plugin
```

---

## 3) Load the sample image and open the display

**Load `jg_4nm_au_bs_00001.cbf` in Image Logger.** Then **open Tools → Image Display** (if already open, reuse it).

```{figure} images/04-horizontalVerticalCut/LoadSingleImage.png
:width: 25%
:name: fig-load-single
Load a single image and open the image display
```

---

## 4) Horizontal cut (in-plane structure)

For a known material, **place the cut near the Yoneda band**. If refractive indices are uncertain, **choose the row where lateral Bragg peaks are strongest.** In this dataset (Au nanoparticles on Si), there are pronounced lateral peaks—so we select that region.

**Set Cut Direction = Horizontal.**

```{figure} images/04-horizontalVerticalCut/HorizontalCut.png
:width: 25%
:name: fig-h-cut
Define a horizontal cut region
```

Coordinates are referenced to the top-left corner of the selected rectangle. Example parameters:

- x = 430, y = 495
- width = 700, height = 10 (integration thickness)

**Open Tools → Multi Plot.**

```{figure} images/04-horizontalVerticalCut/MutiPlotPanel.png
:width: 25%
:name: fig-multiplot-panel
Open Multi Plot to visualize the cut
```

**Set Sequence to 1** (process only 00001). **Click the Run arrow.** If prompted to save previous results, **choose No** for this demo.

```{figure} images/04-horizontalVerticalCut/RunHorizontalCut.png
:width: 25%
:name: fig-run-hcut
Run the horizontal cut
```

If the right panel looks empty, **open Multi Plot → Config** and select the data sources:

- x: Line Integration P03 → x-Axis
- y: Line Integration P03 → Intensity

For scattering curves, **set y-axis Scaling to log**.

```{figure} images/04-horizontalVerticalCut/MultiPlotConfig.png
:width: 25%
:name: fig-multiplot-config
Configure axes for the line profile (log y)
```

```{figure} images/04-horizontalVerticalCut/MutiPlotResultShow.png
:width: 25%
:name: fig-multiplot-result
Horizontal cut result
```

Interpretation:

- Peak positions along the horizontal cut relate to in-plane nearest-neighbor distances: $d = 2\pi/q_y$.
- Integration height trades off SNR vs resolution; too large a height may smear features if $q_z$ varies significantly.

---

## 5) Vertical cut (out-of-plane structure)

You can either reuse the Line Integration P03 module (change direction) or **add a second Line Integration P03** dedicated to vertical cuts.

```{figure} images/04-horizontalVerticalCut/VerticalCutPlugin.png
:width: 25%
:name: fig-v-plugin
Add a second Line Integration module for vertical cuts (optional)
```

**Set Cut Direction = Vertical** and choose a region such as:

- x = 791, y = 430
- width = 3, height = 400

If you added a second module, **update Multi Plot → Config** to use it:

- x: Line Integration P03 2 → x-Axis
- y: Line Integration P03 2 → Intensity

Then **click Run**.

```{figure} images/04-horizontalVerticalCut/VerticalCutPanel.png
:width: 25%
:name: fig-v-cut
Run the vertical cut
```

Interpretation:

- Vertical cuts emphasize out-of-plane correlations (thickness fringes, vertical stacking), often analyzed near/above Yoneda.
- If a specular ridge is present, consider masking the direct beam/beamstop region.

---


## 6) Export the 1D curves

For ASCII output (dat), **open Export → DB Text Export** and **select the datasets to export.**

```{figure} images/04-horizontalVerticalCut/exportDat.png
:width: 25%
:name: fig-export-dat
Export to ASCII (dat)
```

```{figure} images/04-horizontalVerticalCut/ExportPanel.png
:width: 25%
:name: fig-export-panel
Select the curves to export
```

