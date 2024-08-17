import React from 'react';

const ButtonGroup = ({ onSave, onSaveDraft, isSubmitting }) => {
  return (
    <div className="flex space-x-4">
      <button
        type="button"
        onClick={onSave}
        className={`btn btn-primary btn-sm ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        Save
      </button>
      <button
        type="button"
        onClick={onSaveDraft}
        className={`btn btn-ghost btn-sm ${isSubmitting ? 'loading' : ''}`}
        disabled={isSubmitting}
      >
        Save Draft
      </button>
    </div>
  );
};

export default ButtonGroup;
