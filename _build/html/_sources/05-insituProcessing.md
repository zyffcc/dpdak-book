# 05 In-situ Processing (time series)

In in-situ experiments you acquire a sequence of images while a parameter changes with time (temperature, humidity, reaction time, dose, etc.). This chapter shows how to process a folder of images as a time series in DPDAK, extract 1D profiles per frame, and build a 2D color map (q vs frame/time).

---

## What you need

- Calibrated geometry (wavelength, SDD, pixel sizes, beam center, tilt/rotation, incidence angle); see 03 Calibration.
- A folder of images with sequential numbering (e.g., 00001 … 00099).
- Optional mask for beamstop and detector gaps.

```{note}
Choose the frame rate (Δt) so it resolves your kinetics. Normalize intensities by exposure time and incident flux when comparing frames.
```

---

## 1) Prepare the workflow

- **Ensure Image Logger is present** (STANDARD PLUGINS → data input → Image Logger).
- **Add q space (q_xy, qz)** (DESY PLUGINS → data input) for q-coordinates.
- **Add Line Integration P03** for 1D cuts (horizontal/vertical). You can add multiple instances for different ROIs/directions.
- **Add/prepare Color Plot 2D** to visualize the time evolution of the 1D profile.

```{figure} images/05-insituProcessing/ColorPlot2DTool.png
:width: 25%
:name: fig-insitu-colorplot-tool
Color Plot 2D module in the workflow
```

If your workspace still contains temporary components from previous chapters, **delete unneeded modules** to keep the workflow clean.

```{figure} images/05-insituProcessing/DeletePlugin.png
:width: 25%
:name: fig-insitu-delete-plugin
Remove unneeded modules
```

---

## 2) Point Image Logger to the series folder

- **Set the data directory** to your in-situ folder, e.g. `exp_data/in_situ_data/jg_4nm_au_02_insitu_20_00001_00009/` (download at https://drive.google.com/drive/folders/1Sl78Z_ynYPighNf874BKksCT4IGr0OQR?usp=sharing if needed).
- **Use the Sequence field** to control which frames to process (e.g., `1-` for all from 00001 to the end; `1-80` for 00001–00080; empty for only the current).

---

## 3) Enter geometry in q space

- **Fill wavelength, SDD, pixel sizes, beam center, tilt/rotation, α_i** (reuse your 03-calibration values).
- This ensures cuts and maps are plotted vs the correct q.

---

## 4) Configure the 1D cut per frame

- **Set Line Integration P03 Cut Direction** (Horizontal near Yoneda for in-plane order; Vertical for out-of-plane structure).
- **Select the ROI** (x, y, width, height). Keep the integration thickness modest to balance SNR and resolution.
- **Open Tools → Multi Plot**, then **set x = Line Integration P03 → x-Axis**, **y = Line Integration P03 → Intensity**, and **set y-axis Scaling = log** if needed.

When this is configured for a single frame, it’s ready to be applied across all frames.

---

## 5) Build the time-evolution color plot

Color Plot 2D stacks the 1D profile across frames:

- **In Color Plot 2D, select Data = Line Integration P03 → Intensity.**
- **Set y_Axis = Line Integration P03 → x-Axis** (the q-axis of the cut).
- **Choose the frame/time axis** (series index by default; use timestamps if available).
- **Click Run** to generate the color map.

```{figure} images/05-insituProcessing/ColorPlotSetting.png
:width: 25%
:name: fig-insitu-colorplot-setting
Example Color Plot 2D settings
```

```{figure} images/05-insituProcessing/ColorPlotResult.png
:width: 25%
:name: fig-insitu-colorplot-result
Time-evolution color map (q vs frame)
```

---

## 6) Batch over the whole series

- **Set Sequence** in Image Logger (e.g., `1-` to process all frames).
- **Click the Run arrow** to process the entire series through your workflow.
- **Refresh Multi Plot / Color Plot 2D** if needed to update the view.

```{note}
If prompted to save previous results, choose according to your workflow. For quick demos, “No” avoids extra files; for real runs, save with consistent names.
```

---

## Notes

- Peak shift in q implies spacing change: $d = 2\pi/q$. Monitor $q(t)$ for thermal strain, swelling, or ordering.
- Peak width trends reflect correlation lengths or domain sizes (Scherrer-like interpretations should be used with care in GISAXS).
- Near the Yoneda angle (critical angle), refraction effects change path lengths. Keep $\alpha_i$ fixed or track it.
