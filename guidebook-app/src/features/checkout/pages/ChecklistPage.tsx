import { useContent } from '@shared/hooks/useContent';
import { useChecklist } from '@shared/hooks/useChecklist';
import { CheckSquare, Square, RotateCcw, Printer } from 'lucide-react';
import styles from './ChecklistPage.module.css';

export default function ChecklistPage() {
  const { content, loading, error } = useContent();

  // Get checklist data (or empty array) - must be before conditional returns
  const checklist = content?.checkout?.checklist || [];

  // Hooks must be called unconditionally - always call useChecklist
  const { toggleItem, resetChecklist, isChecked, allChecked } =
    useChecklist(checklist);

  if (loading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (error || !content) {
    return (
      <div className={styles.error}>
        <p>Failed to load content. Please try again later.</p>
        {error && <p>Error: {error.message}</p>}
      </div>
    );
  }

  if (!content.checkout || !content.checkout.checklist) {
    return (
      <div className={styles.error}>
        <p>Checklist data is missing.</p>
      </div>
    );
  }

  if (checklist.length === 0) {
    return (
      <div className={styles.error}>
        <p>No checklist items found.</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const itemsByCategory = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof checklist>
  );

  const categoryLabels: Record<string, string> = {
    clean: 'Cleaning',
    return: 'Return Items',
    trash: 'Trash & Recycling',
    other: 'Other',
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Checkout Checklist</h1>
        <div className={styles.actions}>
          <button
            onClick={resetChecklist}
            className={styles.resetButton}
            aria-label="Reset checklist"
          >
            <RotateCcw size={16} />
            <span>Reset</span>
          </button>
          <button
            onClick={handlePrint}
            className={styles.printButton}
            aria-label="Print checklist"
          >
            <Printer size={16} />
            <span>Print</span>
          </button>
        </div>
      </div>

      {allChecked && (
        <div className={styles.completeMessage}>
          <CheckSquare size={24} />
          <p>All items completed! You're ready to checkout.</p>
        </div>
      )}

      <div className={styles.checklist}>
        {Object.entries(itemsByCategory).map(([category, items]) => (
          <section key={category} className={styles.categorySection}>
            <h2>{categoryLabels[category] || category}</h2>
            <ul className={styles.itemsList}>
              {items.map((item) => (
                <li key={item.id} className={styles.item}>
                  <label className={styles.label}>
                    <input
                      type="checkbox"
                      checked={isChecked(item.id)}
                      onChange={() => toggleItem(item.id)}
                      className={styles.checkbox}
                    />
                    <span className={styles.checkboxIcon}>
                      {isChecked(item.id) ? (
                        <CheckSquare size={20} />
                      ) : (
                        <Square size={20} />
                      )}
                    </span>
                    <span
                      className={`${styles.itemText} ${
                        isChecked(item.id) ? styles.checked : ''
                      }`}
                    >
                      {item.text}
                    </span>
                  </label>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

