import { useEffect, useRef, useState } from "react";
import { Mail, KeyRound } from "lucide-react";

const Auth = () => {
  const emailRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // delay باش animation تبان
    setTimeout(() => {
      setOpen(true);
      emailRef.current?.focus();
    }, 200);
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "L'email est requis";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email invalide";

    if (!formData.password) newErrors.password = "Le mot de passe est requis";
    else if (formData.password.length < 6)
      newErrors.password = "Au moins 6 caractères";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("Connexion avec:", formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-100 flex items-center justify-center p-2">
      <div className="w-full max-w-sm">
        {/* CARD */}
        <div
          className={`
            bg-white rounded-xl shadow-xl
            overflow-hidden origin-center
            transform-gpu
            transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
            ${
              open
                ? "scale-100 scale-y-100 opacity-100"
                : "scale-75 scale-y-0 opacity-100"
            }
          `}
        >
          {/* CONTENT */}
          <div
            className={`
              p-6 space-y-5
              transition-opacity duration-500 delay-300
              ${open ? "opacity-100" : "opacity-0"}
            `}
          >
            {/* Header */}
            <div className="text-center space-y-1">
              <div className="mx-auto w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center">
                <KeyRound className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-800">Connexion</h1>
              <p className="text-xs text-gray-500">
                Accédez à votre tableau de bord
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">
                  Adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 py-2.5 text-sm border rounded-md
                      focus:outline-none focus:ring-2 focus:ring-[#2A9D90]
                      ${errors.email ? "border-red-400" : "border-gray-300"}
                    `}
                  />
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-500">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-700">
                  Mot de passe
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 py-2.5 text-sm border rounded-md
                      focus:outline-none focus:ring-2 focus:ring-[#2A9D90]
                      ${errors.password ? "border-red-400" : "border-gray-300"}
                    `}
                  />
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-500">{errors.password}</p>
                )}
              </div>

              {/* Remember / Forgot */}
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-1">
                  <input type="checkbox" className="w-3.5 h-3.5" />
                  <span className="text-gray-600">Se souvenir</span>
                </label>
                <a href="#" className="text-[#2A9D90] font-medium">
                  Mot de passe oublié ?
                </a>
              </div>

              {/* Button */}
              <button
                type="submit"
                className="w-full bg-[#2A9D90] text-white text-sm font-semibold py-2.5 rounded-md
                  transition-transform hover:scale-[1.02]"
              >
                Se connecter
              </button>
            </form>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-white text-gray-500">Ou</span>
              </div>
            </div>

            {/* Signup */}
            <p className="text-center text-xs text-gray-600">
              Pas encore de compte ?{" "}
              <a href="#" className="text-[#2A9D90] font-semibold">
                Créer un compte
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-[11px] text-gray-500 mt-4">
          © 2025 Cabinet Médical
        </p>
      </div>
    </div>
  );
};

export default Auth;
