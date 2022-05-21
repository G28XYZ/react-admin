import React, { useEffect } from "react";

function ModalOpenPage({ action }) {
  useEffect(() => {
    document.getElementsByName(`btn-page`)[0].addEventListener("click", action);
    return () => {
      document.getElementsByName(`btn-page`)[0].removeEventListener("click", action);
    };
  }, []);

  return (
    <div id={`modal-page`} uk-modal="true">
      <div className="uk-modal-dialog">
        <button className="uk-modal-close-default" type="button" uk-close="true"></button>
        <div className="uk-modal-header">
          <h2 className="uk-modal-title">Открыть страницу</h2>
        </div>
        <div className="uk-modal-body">
          <p>{}</p>
        </div>
        <div className="uk-modal-footer uk-text-right">
          <button className="uk-button uk-button-default uk-modal-close" type="button">
            Отменить
          </button>
          <button
            className="uk-button uk-button-primary uk-modal-close"
            type="button"
            name={`btn-page`}
          >
            Открыть
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalOpenPage;
