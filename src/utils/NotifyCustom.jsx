import toast from "react-hot-toast";

const NotifyCustom = (type, message) => {
  toast.custom(
    (t) => {
      const baseStyle =
        "px-4 py-3 rounded-lg shadow-md text-sm font-medium text-gray-800 w-fit animate-enter";
      const typeStyles = {
        success:
          "bg-gradient-to-br from-white via-green-50 to-green-100 border border-green-300",
        error:
          "bg-gradient-to-br from-white via-red-50 to-red-100 border border-red-300",
        info: "bg-gradient-to-br from-white via-blue-50 to-blue-100 border border-blue-300",
      };
      const icons = {
        success: "✅",
        error: "❌",
        info: "ℹ️",
      };

      return (
        <div
          className={`${baseStyle} ${typeStyles[type] || typeStyles.info}`}
          onClick={() => toast.dismiss(t.id)}
        >
          {icons[type]} {message}
        </div>
      );
    },
    { duration: 3000 }
  );
};

export default NotifyCustom;
