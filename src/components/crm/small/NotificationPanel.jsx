import React from "react";
import { OverlayTrigger, Tooltip, Badge } from "react-bootstrap";

const NotificationPanel = ({ comments, reminds }) => {
  return (
    <div
      className="d-flex justify-content-end"
      style={{ display: "flex", gap: "10px", alignItems: "center" }}
    >
      {/* Иконка комментариев */}
      {comments > 0 && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Комментарии: {comments}</Tooltip>}
        >
          <div style={{ position: "relative" }}>
            <i
              class="bi bi-chat-square-text me-2"
              style={{ fontSize: "12px" }}
            ></i>

            <Badge
              pill
              bg="secondary"
              style={{
                position: "absolute",
                top: "-2px",
                right: "-6px",
                fontSize: "8px",
              }}
            >
              {comments}
            </Badge>
          </div>
        </OverlayTrigger>
      )}

      {/* Иконка напоминаний */}
      {reminds > 0 && (
        <OverlayTrigger
          placement="bottom"
          overlay={<Tooltip>Напоминания: {reminds}</Tooltip>}
        >
          <div style={{ position: "relative" }}>
            <i
              class="bi bi-exclamation-diamond  me-2"
              style={{ fontSize: "12px" }}
            ></i>

            <Badge
              pill
              bg="secondary"
              style={{
                position: "absolute",
                top: "-2px",
                right: "-6px",
                fontSize: "8px",
              }}
            >
              {reminds}
            </Badge>
          </div>
        </OverlayTrigger>
      )}
    </div>
  );
};

export default NotificationPanel;
