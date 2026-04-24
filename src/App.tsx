import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  Library, 
  MonitorPlay, 
  LineChart,
  GraduationCap,
  Award,
  Zap,
  BookCheck,
  ChevronLeft,
  UserCircle2,
  ArrowRight,
  LogOut,
  Building2
} from 'lucide-react';

type ViewState = 'login' | 'dashboard' | 'schedule';

export default function App() {
  const [view, setView] = useState<ViewState>('login');
  const [studentId, setStudentId] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId.trim() === '') {
      setError('請輸入您的帳號或學號');
      return;
    }
    setError('');
    setView('dashboard');
  };

  const pageVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.98 }
  };

  const pageTransition = {
    type: 'spring',
    stiffness: 260,
    damping: 20
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 sm:p-12 md:p-16 text-slate-800 font-sans">
      <div className="w-full max-w-5xl relative">
        <AnimatePresence mode="wait">
          
          {/* ========== 第一頁：登入頁面 ========== */}
          {view === 'login' && (
            <motion.div 
              key="login" 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants} 
              transition={pageTransition}
              className="w-full max-w-[420px] mx-auto bg-white rounded-3xl p-10 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-2">
                  <GraduationCap size={32} />
                </div>
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                    三元及第文教機構
                  </h1>
                  <p className="text-sm text-slate-500 mt-2 font-medium tracking-wide uppercase">
                    Student Login System
                  </p>
                </div>

                <form onSubmit={handleLogin} className="w-full mt-8 space-y-5">
                  <div className="space-y-2 text-left">
                    <label htmlFor="studentId" className="text-sm font-semibold text-slate-700 block">
                      帳號 / 學號
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <UserCircle2 className="h-5 w-5 text-slate-400" />
                      </div>
                      <input
                        id="studentId"
                        type="text"
                        value={studentId}
                        onChange={(e) => setStudentId(e.target.value)}
                        placeholder="請輸入您的學號"
                        className={`w-full pl-11 pr-4 py-3.5 bg-slate-50 border rounded-xl focus:outline-none focus:ring-2 focus:bg-white transition-all
                          ${error ? 'border-red-300 focus:ring-red-200' : 'border-slate-200 focus:border-blue-500 focus:ring-blue-100'}`}
                      />
                    </div>
                    {error && (
                      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-xs mt-1 font-medium">
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                  >
                    <span>登入系統</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </div>
            </motion.div>
          )}

          {/* ========== 第二頁：首頁儀表板 ========== */}
          {view === 'dashboard' && (
            <motion.div 
              key="dashboard" 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants} 
              transition={pageTransition}
              className="w-full max-w-4xl mx-auto"
            >
              {/* Header */}
              <header className="flex justify-between items-center mb-10 px-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                    三
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                      三元及第 <span className="text-blue-600">文教機構</span>
                    </h1>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 font-semibold">
                      Student Portal
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Welcome back,</p>
                    <p className="text-sm font-semibold">{studentId} 學員</p>
                  </div>
                  <button 
                    onClick={() => {
                      setView('login');
                      setStudentId('');
                    }}
                    className="h-10 w-10 bg-slate-100 hover:bg-slate-200 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-slate-500 transition-colors"
                  >
                    <LogOut size={16} />
                  </button>
                </div>
              </header>

              {/* Grid Menu */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <DashboardCard 
                  title="課程預排表查詢" 
                  subtitle="Course Schedule"
                  icon={<Calendar size={28} />} 
                  color="bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  onClick={() => setView('schedule')}
                />
                <DashboardCard 
                  title="可領取書籍查詢" 
                  subtitle="Available Books"
                  icon={<Library size={28} />} 
                  color="bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                  onClick={() => alert('開發中...')}
                />
                <DashboardCard 
                  title="雲端課程系統" 
                  subtitle="Cloud Course System"
                  icon={<MonitorPlay size={28} />} 
                  color="bg-violet-100 text-violet-600 group-hover:bg-violet-600 group-hover:text-white"
                  onClick={() => alert('開發中...')}
                />
                <DashboardCard 
                  title="學習診斷系統" 
                  subtitle="Learning Diagnostic"
                  icon={<LineChart size={28} />} 
                  color="bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                  onClick={() => alert('開發中...')}
                />
              </div>
            </motion.div>
          )}

          {/* ========== 第三頁：預排表查詢 ========== */}
          {view === 'schedule' && (
            <motion.div 
              key="schedule" 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants} 
              transition={pageTransition}
              className="w-full max-w-3xl mx-auto"
            >
              {/* Back & Header */}
              <div className="mb-8">
                <button 
                  onClick={() => setView('dashboard')}
                  className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors mb-6 group w-fit"
                >
                  <div className="p-1 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors">
                    <ChevronLeft size={18} />
                  </div>
                  返回專區
                </button>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">
                  課程預排表查詢 <span className="text-lg font-normal text-slate-400 ml-2">Course Schedule</span>
                </h2>
                <p className="text-slate-500">請選擇您目前所屬的班別，以查看最新的課程進度與實體排課表。</p>
              </div>

              {/* List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <ScheduleOptionCard 
                  title="二技統測班" 
                  desc="Tech/Voc Entrance Exam"
                  icon={<GraduationCap size={24} />} 
                  color="bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white"
                  progressColor="bg-blue-500"
                  progressWidth="w-2/3"
                />
                <ScheduleOptionCard 
                  title="執照國考班" 
                  desc="National License Exam"
                  icon={<Award size={24} />} 
                  color="bg-emerald-100 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white"
                  progressColor="bg-emerald-500"
                  progressWidth="w-full"
                />
                <ScheduleOptionCard 
                  title="二技衝刺班" 
                  desc="Intensive Prep Course"
                  icon={<Zap size={24} />} 
                  color="bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white"
                  progressColor="bg-orange-500"
                  progressWidth="w-1/4"
                />
                <ScheduleOptionCard 
                  title="執照題庫班" 
                  desc="License Question Bank"
                  icon={<BookCheck size={24} />} 
                  color="bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white"
                  progressColor="bg-indigo-500"
                  progressWidth="w-1/2"
                />
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

function DashboardCard({ title, subtitle, icon, color, onClick }: any) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between items-start text-left hover:border-blue-300 hover:shadow-md transition-all h-full min-h-[180px]`}
    >
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${color}`}>
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm font-medium text-slate-400 capitalize tracking-tight">{subtitle}</p>
      </div>
    </motion.button>
  );
}

function ScheduleOptionCard({ title, desc, icon, color, progressColor, progressWidth }: any) {
  return (
    <motion.button
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      onClick={() => alert(`您選擇了: ${title}`)}
      className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col justify-between items-start text-left hover:border-blue-300 hover:shadow-md transition-all w-full min-h-[220px]"
    >
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-colors duration-300 ${color}`}>
        {icon}
      </div>
      <div className="w-full">
        <h3 className="text-xl font-bold text-slate-900 mb-1">{title}</h3>
        <p className="text-sm text-slate-400 font-medium tracking-tight uppercase mb-4">{desc}</p>
        <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-auto">
          <div className={`h-full ${progressColor} ${progressWidth}`}></div>
        </div>
      </div>
    </motion.button>
  );
}
