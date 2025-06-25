
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { LogIn, UserPlus, Mail, Lock, User } from 'lucide-react';
import Layout from '@/components/Layout';
import AppButton from '@/components/custom/AppButton';
import { toast } from '@/hooks/use-toast';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password);
        if (success) {
          toast({
            title: "تم تسجيل الدخول بنجاح",
            description: "مرحباً بك في الموسوعة القانونية الجزائرية",
          });
          navigate('/');
        } else {
          toast({
            title: "خطأ في تسجيل الدخول",
            description: "البريد الإلكتروني أو كلمة المرور غير صحيحة",
            variant: "destructive",
          });
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast({
            title: "خطأ في التسجيل",
            description: "كلمتا المرور غير متطابقتان",
            variant: "destructive",
          });
          return;
        }
        
        const success = await register(formData.name, formData.email, formData.password);
        if (success) {
          toast({
            title: "تم إنشاء الحساب بنجاح",
            description: "مرحباً بك في الموسوعة القانونية الجزائرية",
          });
          navigate('/');
        } else {
          toast({
            title: "خطأ في التسجيل",
            description: "البريد الإلكتروني مستخدم بالفعل",
            variant: "destructive",
          });
        }
      }
    } catch (error) {
      toast({
        title: "حدث خطأ",
        description: "حاول مرة أخرى لاحقاً",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-primary-600 rounded-full flex items-center justify-center">
              {isLogin ? (
                <LogIn className="h-8 w-8 text-white" />
              ) : (
                <UserPlus className="h-8 w-8 text-white" />
              )}
            </div>
            <h2 className="mt-6 text-3xl font-bold text-gray-900">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {isLogin 
                ? 'ادخل إلى حسابك للوصول إلى جميع الخدمات' 
                : 'انضم إلى مجتمع الموسوعة القانونية الجزائرية'
              }
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              {!isLogin && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    الاسم الكامل
                  </label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required={!isLogin}
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                      placeholder="أدخل اسمك الكامل"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                    placeholder="أدخل بريدك الإلكتروني"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                    placeholder="أدخل كلمة المرور"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                    تأكيد كلمة المرور
                  </label>
                  <div className="relative">
                    <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={!isLogin}
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pr-10 pl-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rtl-input"
                      placeholder="أعد إدخال كلمة المرور"
                    />
                  </div>
                </div>
              )}
            </div>

            <AppButton
              type="submit"
              className="w-full"
              size="lg"
              loading={loading}
              icon={isLogin ? LogIn : UserPlus}
            >
              {isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب'}
            </AppButton>
          </form>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              {isLogin ? 'ليس لديك حساب؟' : 'لديك حساب بالفعل؟'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="mr-2 font-medium text-primary-600 hover:text-primary-500 transition-colors"
              >
                {isLogin ? 'إنشاء حساب جديد' : 'تسجيل الدخول'}
              </button>
            </p>
          </div>

          {/* Demo Accounts */}
          <div className="bg-primary-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-primary-900 mb-2">حسابات تجريبية:</h3>
            <div className="space-y-2 text-sm text-primary-700">
              <div>
                <strong>مستخدم عادي:</strong> user@test.com / 123456
              </div>
              <div>
                <strong>مشرف:</strong> admin@test.com / admin123
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
