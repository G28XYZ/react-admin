import React, { useEffect } from "react";

function ModalPublish({ action }) {
  useEffect(() => {
    document.getElementsByName(`btn-publish`)[0].addEventListener("click", action);
    return () => {
      document.getElementsByName(`btn-publish`)[0].removeEventListener("click", action);
    };
  }, []);

  return (
    <div id={`modal-publish`} uk-modal="true">
      <div className="uk-modal-dialog">
        <button className="uk-modal-close-default" type="button" uk-close="true"></button>
        <div className="uk-modal-header">
          <h2 className="uk-modal-title">Сохранить страницу?</h2>
        </div>
        <div className="uk-modal-footer uk-text-right">
          <button className="uk-button uk-button-default uk-modal-close" type="button">
            Отменить
          </button>
          <button
            className="uk-button uk-button-primary uk-modal-close"
            type="button"
            name={`btn-publish`}
          >
            Сохранить
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalPublish;
