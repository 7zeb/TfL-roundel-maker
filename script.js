const circle = document.getElementById('outerCircle');
const bar = document.getElementById('bar');
const label = document.getElementById('label');

const circleColorInput = document.getElementById('circleColor');
const barColorInput = document.getElementById('barColor');
const textColorInput = document.getElementById('textColor');
const textInput = document.getElementById('textInput');
const downloadBtn = document.getElementById('downloadBtn');

const presetButtons = document.querySelectorAll('[data-preset]');

circleColorInput.addEventListener('input', e => {
  circle.setAttribute('stroke', e.target.value);
});

barColorInput.addEventListener('input', e => {
  bar.setAttribute('fill', e.target.value);
});

textColorInput.addEventListener('input', e => {
  label.setAttribute('fill', e.target.value);
});

textInput.addEventListener('input', e => {
  label.textContent = e.target.value.toUpperCase();
});

const presets = {
  underground: {
    circle: '#0019A8',
    bar: '#0019A8',
    text: '#ffffff',
    label: 'UNDERGROUND'
  },
  overground: {
    circle: '#ff6600',
    bar: '#ff6600',
    text: '#ffffff',
    label: 'OVERGROUND'
  },
  dlr: {
    circle: '#00afad',
    bar: '#00afad',
    text: '#ffffff',
    label: 'DLR'
  },
  elizabeth: {
    circle: '#6950a1',
    bar: '#6950a1',
    text: '#ffffff',
    label: 'ELIZABETH LINE'
  }
};

presetButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.preset;
    const preset = presets[key];
    if (!preset) return;

    circle.setAttribute('stroke', preset.circle);
    bar.setAttribute('fill', preset.bar);
    label.setAttribute('fill', preset.text);
    label.textContent = preset.label;

    circleColorInput.value = preset.circle;
    barColorInput.value = preset.bar;
    textColorInput.value = preset.text;
    textInput.value = preset.label;
  });
});

downloadBtn.addEventListener('click', () => {
  const svg = document.getElementById('roundel');
  const serializer = new XMLSerializer();
  let source = serializer.serializeToString(svg);

  if (!source.match(/^<svg[^>]+xmlns="http:\/\/www\.w3\.org\/2000\/svg"/)) {
    source = source.replace(
      /^<svg/,
      '<svg xmlns="http://www.w3.org/2000/svg"'
    );
  }

  source = '<?xml version="1.0" encoding="UTF-8"?>\n' + source;

  const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'roundel.svg';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  URL.revokeObjectURL(url);
});
