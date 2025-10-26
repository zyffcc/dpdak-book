# 03 Calibration

This chapter shows how to calibrate GISAXS/SAXS geometry in DPDAK using a standard sample. We’ll use Silver behenate (AgBeh) to determine the sample–detector distance (SDD) and verify the beam center. The same procedure applies to SAXS and GISAXS data.

---

## What you need

- DPDAK installed and running (see 01 and 02).
- Example data: Google Drive folder
	https://drive.google.com/drive/folders/1Sl78Z_ynYPighNf874BKksCT4IGr0OQR?usp=sharing
	- Use file: `calibration_AgBeh/cali_2p5m_gisaxs_agbh_241024_00001_00001.cbf`
- Detector and beamline parameters from the scientist/instrument log:
	- Wavelength or energy
	- Detector pixel size (e.g., Pilatus 2M: 172 µm; Eiger: 75 µm)
	- Beam center (X, Y) in pixels
	- Initial guess of SDD (mm)
	- Tilt/Rotation (often 0 for a perpendicular detector)

```{note}
Energy–wavelength conversion: $\lambda\,[\mathrm{Å}] = \dfrac{12.39842}{E\,[\text{keV}]}$.
Example here: $\lambda = 1.045\,\mathrm{Å}$.
```

---

## 1) Open the Calibration tool

**Open Tools → Calibration.**

```{figure} images/03-calibration/Tools-calibration.png
:width: 25%
:name: fig-cal-tools
Open Tools → Calibration
```

---

## 2) Choose the standard and load the data

- **Set the Standard Name to AgBeh (Silver behenate).**
- **Click Browse for Detector File(s) and select the example CBF file from the data folder.**

```{figure} images/03-calibration/Select-Standard-Name.png
:width: 25%
:name: fig-cal-select-file
Select AgBeh and load the detector file
```

If the image looks dim, **click Config** at the top and **use a logarithmic color scale** and a suitable range.

```{figure} images/03-calibration/AdjustCaliColorScaling.png
:width: 25%
:name: fig-cal-color-config
Adjust display color scaling (log is often helpful)
```

---

## 3) Enter geometry parameters

**Fill in the known parameters from the beamline log and your instrument:**

- Wavelength, Pixel size X/Y
- Beam center X/Y (pixels)
- Initial SDD (mm)
- Tilt/Rotation (0 if detector perpendicular)

For the example data:

- Pixel size X = 172 µm, Pixel size Y = 172 µm  (Pilatus 2M)
- Beam center X = 791 px, Beam center Y = 368 px
- Wavelength = 1.045 Å
- Initial SDD ≈ 2500 mm
- Tilt = 0, Rotation = 0 (assumed)

```{figure} images/03-calibration/InitialCalibrationPara.png
:width: 25%
:name: fig-cal-params
Enter wavelength, pixel sizes, beam center, and initial SDD
```

Because the beamline provides most values, we typically fit only SDD. **Leave only SDD checked in the Fit column** and keep the others fixed.

---

## 4) Select peaks to use in the fit

In this GISAXS example, two strong rings are clearly visible. **Set the number of peaks accordingly** (use the first two rings for a robust fit).

```{figure} images/03-calibration/SelectCalibrationPeakNum.png
:width: 25%
:name: fig-cal-peak-count
Choose the number of AgBeh rings to include (here: first two)
```

---

## 5) Fit SDD and align the pattern

**Click Fit to start.** **Keep the Fit Options at their defaults.** **You can click Fit a few times to refine.**

```{figure} images/03-calibration/CaliClickFIt.png
:width: 25%
:name: fig-cal-fit
Run the fit (fit SDD only)
```

When the red overlay (the AgBeh reference pattern) aligns with the observed rings, the calibration is done.

```{figure} images/03-calibration/CaliFinished.png
:width: 25%
:name: fig-cal-finished
Calibration finished
```

The final result can be found on the right panel.