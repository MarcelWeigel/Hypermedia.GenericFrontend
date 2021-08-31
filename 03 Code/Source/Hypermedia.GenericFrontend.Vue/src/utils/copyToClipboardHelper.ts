export default class CopyToClipboardHelper {
  public static copy(value: string): void {
    if (!value) {
      return;
    }

    if (typeof navigator.clipboard.readText !== 'function') {
      console.warn('Clipboard access not granted by browser');
      window.alert('Clipboard access not granted by browser');
      return;
    }

    const el = document.createElement('textarea');
    el.value = value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    navigator.clipboard
      .readText()
      .then((clipText) => ((document.querySelector('.editor') as any).innerText += clipText))
      .catch((e) => console.error(e));
  }
}
