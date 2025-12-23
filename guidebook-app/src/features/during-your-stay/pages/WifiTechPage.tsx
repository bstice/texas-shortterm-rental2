import { useContent } from '@shared/hooks/useContent';
import { useCopyToClipboard } from '@shared/hooks/useCopyToClipboard';
import { Copy, Check, Wifi } from 'lucide-react';
import Markdown from '@shared/components/ui/Markdown';
import styles from './WifiTechPage.module.css';

export default function WifiTechPage() {
  const { content, loading, error } = useContent();
  const { copy: copySSID, copied: copiedSSID } = useCopyToClipboard();
  const { copy: copyPassword, copied: copiedPassword } = useCopyToClipboard();

  const handleCopySSID = () => {
    if (!content) return;
    copySSID(content.duringYourStay.wifi.ssid);
  };

  const handleCopyPassword = () => {
    if (!content) return;
    copyPassword(content.duringYourStay.wifi.password);
  };

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !content) {
    return (
      <div className={styles.error}>
        <p>Failed to load content. Please try again later.</p>
      </div>
    );
  }

  const { wifi } = content.duringYourStay;

  return (
    <div className={styles.container}>
      <h1>
        <Wifi size={32} className={styles.icon} />
        Wi-Fi & Tech
      </h1>

      <section className={styles.wifiSection}>
        <h2>Wi-Fi Information</h2>
        <div className={styles.wifiInfo}>
          <div className={styles.wifiItem}>
            <label className={styles.label}>Network Name (SSID)</label>
            <div className={styles.valueBox}>
              <span className={styles.value}>{wifi.ssid}</span>
              <button
                onClick={handleCopySSID}
                className={styles.copyButton}
                aria-label="Copy network name"
              >
                {copiedSSID ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className={styles.wifiItem}>
            <label className={styles.label}>Password</label>
            <div className={styles.valueBox}>
              <span className={styles.value}>{wifi.password}</span>
              <button
                onClick={handleCopyPassword}
                className={styles.copyButton}
                aria-label="Copy password"
              >
                {copiedPassword ? (
                  <>
                    <Check size={16} />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.instructionsSection}>
        <h2>Connection Instructions</h2>
        <Markdown content={wifi.instructions} />
      </section>

      {wifi.troubleshooting && wifi.troubleshooting.length > 0 && (
        <section className={styles.troubleshootingSection}>
          <h2>Troubleshooting</h2>
          <ul className={styles.troubleshootingList}>
            {wifi.troubleshooting.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

