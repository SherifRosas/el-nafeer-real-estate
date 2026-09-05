import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: '3Elmstaba Café - استشارة التطوير الاستراتيجي',
  description: 'فرصة شراكة لمشروع شاورما سوري داخل 3Elmstaba Café.',
};

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-[#0b1121] text-slate-200 font-sans pb-20" dir="rtl">
      <div className="max-w-2xl mx-auto px-4 py-8">
        
        {/* Header Section */}
        <div className="mb-10 text-right">
          <h1 className="text-3xl font-bold text-cyan-400 mb-2 leading-tight">
            3Elmstaba Café -<br />استشارة التطوير الاستراتيجي
          </h1>
          <p className="text-slate-400 text-sm mb-6">
            الموقع: مدينة طوخ، مصر | نموذج العمل: مطبخ سحابي ومقهى مدمج
          </p>
          <div className="inline-block bg-cyan-600 text-white font-semibold py-2 px-6 rounded-full text-sm shadow-md">
            سجل الاستشارة الاستراتيجية
          </div>
        </div>

        {/* Conversation Feed */}
        <div className="space-y-6 relative z-10 text-right">
          
          {/* Card 1: Client */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-r-4 border-r-purple-500 shadow-lg">
            <div className="p-5">
              <h3 className="text-purple-400 font-bold text-xs tracking-wider mb-3 uppercase">العميل / مستشار الأعمال</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                موقع المقهى في مدينة طوخ، طلب مني المالك تطوير أعماله واقترحت عليه مشاركة أحد محليه المزدوجين مع نشاط آخر لبيع الشاورما السوري. ما رأيك؟
              </p>
            </div>
          </div>

          {/* Card 2: Consultant */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-r-4 border-r-cyan-500 shadow-lg">
            <div className="p-5">
              <h3 className="text-cyan-400 font-bold text-xs tracking-wider mb-4 uppercase">التحليل الاستشاري للأعمال</h3>
              <p className="text-slate-200 leading-relaxed text-sm mb-4">
                الشراكة بين مقهى محلي ومطعم شاورما سوري تُعد خطوة تجارية قوية في مصر. الشاورما منتج ذو هامش ربح مرتفع، سريع الحركة، ويجذب الزبائن خلال فترة ما بعد الظهر والمساء—وهي أوقات الذروة لإيرادات المقاهي.
              </p>
              <p className="text-slate-200 leading-relaxed text-sm mb-6">
                مع ذلك، وبالنظر إلى صور <strong>3Elmstaba Cafe</strong>، فإن التنفيذ السليم يتطلب توازناً دقيقاً من الناحية الهيكلية والتشغيلية.
              </p>

              {/* Pros */}
              <div className="mb-6 border-r-2 border-r-orange-500 pr-3">
                <h4 className="text-orange-500 font-bold mb-3">إيجابيات الاقتراح</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">مشاركة الإيرادات وتقليل المخاطر:</strong> تأجير أو مشاركة نصف واجهة المحل يضمن فوراً دخلاً من الإيجار أو مشاركة في المصاريف الثابتة (الكهرباء، الإيجار، الرسوم).</li>
                  <li><strong className="text-white">زيادة حركة الزبائن:</strong> وجود عنصر غذائي شهير يجذب زبائن لم يكونوا ليزوروا المكان لتناول المشروبات فقط، مما يحول زبائن الطعام إلى زبائن للمشروبات والشيشة.</li>
                  <li><strong className="text-white">كفاءة استغلال المساحة:</strong> تحويل أحد الجانبين إلى محطة طعام متخصصة يزيد من الاستفادة من المساحة المواجهة للشارع غير المستغلة بالكامل.</li>
                </ul>
              </div>

              {/* Cons */}
              <div className="mb-8 border-r-2 border-r-orange-500 pr-3">
                <h4 className="text-orange-500 font-bold mb-3">السلبيات والمخاطر التشغيلية الحرجة</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">الروائح والانبعاثات الحرارية:</strong> سيخ الشاورما ينتج حرارة شديدة ودهون ودخان كثيف. بدون مدخنة مخصصة ونظام عادم، ستستقر أدخنة الزيوت على المقاعد والأثاث الداخلي.</li>
                  <li><strong className="text-white">الفوضى البصرية:</strong> المقهى يتميز حالياً بطابع ريفي/بلدي بألوان زاهية ورسومات جدارية. دمج مطبخ سوري من الفولاذ المقاوم للصدأ (استانلس) قد يبدو فوضوياً إذا لم يندمج بسلاسة في تصميم الواجهة.</li>
                  <li><strong className="text-white">اختناق حركة الزبائن:</strong> الشاورما تجذب زبائن الـ Takeaway وعمال التوصيل. إذا سد هؤلاء المدخل، سينزعج زبائن المقهى التقليديون من الضوضاء والزحام.</li>
                </ul>
              </div>

              {/* Matrix Table */}
              <div className="mb-2 border-r-2 border-r-orange-500 pr-3">
                <h4 className="text-orange-500 font-bold mb-3">مصفوفة العمل الاستراتيجي</h4>
              </div>
              
              <div className="overflow-x-auto bg-[#0f172a] rounded-lg border border-slate-700/50" dir="rtl">
                <table className="w-full text-sm text-right">
                  <thead className="bg-[#1e293b]/50 text-cyan-400">
                    <tr>
                      <th className="px-4 py-3 font-semibold border-b border-slate-700/50">المجال</th>
                      <th className="px-4 py-3 font-semibold border-b border-slate-700/50">الإجراء الاستراتيجي</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/50 text-slate-300">
                    <tr className="bg-[#0f172a]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">فصل المساحات</td>
                      <td className="px-4 py-3 align-top">تقسيم المساحة الداخلية بوضوح. يجب أن يكون لمطبخ الشاورما حاجز زجاجي/معدني لمنع تسرب الحرارة والدهون إلى منطقة جلوس المقهى.</td>
                    </tr>
                    <tr className="bg-[#111827]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">الاستثمار في التهوية</td>
                      <td className="px-4 py-3 align-top">إلزام بائع الطعام السوري (أو تقاسم التكلفة) بتركيب شفاط صناعي ونظام فلترة. هذا أمر غير قابل للتفاوض لراحة المقهى.</td>
                    </tr>
                    <tr className="bg-[#0f172a]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">توحيد الهوية البصرية</td>
                      <td className="px-4 py-3 align-top">مطابقة واجهة كاونتر الشاورما أو اللافتات مع المظهر الخشبي الريفي الحالي لـ 3Elmstaba.</td>
                    </tr>
                    <tr className="bg-[#111827]">
                      <td className="px-4 py-3 font-medium text-white align-top whitespace-nowrap">الترويج المتبادل</td>
                      <td className="px-4 py-3 align-top">هيكلة الاتفاق بحيث يحصل زبائن المقهى على خصم على الوجبات، أو السماح لزبائن الطعام بالجلوس في المقهى بشرط شراء مشروب واحد على الأقل.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          </div>

          {/* Card 3: Client */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-r-4 border-r-purple-500 shadow-lg mt-6">
            <div className="p-5">
              <h3 className="text-purple-400 font-bold text-xs tracking-wider mb-3 uppercase">العميل / مستشار الأعمال</h3>
              <p className="text-slate-200 leading-relaxed text-sm">
                الباب الثاني وتحديداً الباب الأيسر، أعطني صوراً بأقل تكلفة، وأعتقد أننا يمكن أن نقرر البيع أونلاين فقط لتغطية الطلب عبر الإنترنت. طوخ مكتظة بالسكان وبها طلب عالٍ على توصيل الطلبات.
              </p>
            </div>
          </div>

          {/* Card 4: Consultant with Image */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-r-4 border-r-cyan-500 shadow-lg mt-6">
            <div className="p-5">
              <h3 className="text-cyan-400 font-bold text-xs tracking-wider mb-4 uppercase">استجابة الاستشارة ومفهوم المطبخ السحابي</h3>
              
              <p className="text-slate-200 leading-relaxed text-sm mb-5">
                تحويل الباب الأيسر إلى نموذج منخفض التكلفة ومُحسّن للتوصيل ("مطبخ سحابي / مركز توصيل") مصمم خصيصاً لسوق التوصيل عالي الكثافة في طوخ هو استراتيجية ممتازة وفعالة من حيث رأس المال.
              </p>

              {/* Concept Image */}
              <div className="relative w-full aspect-video rounded-lg overflow-hidden border border-slate-700/50 mb-5">
                {/* Fallback styling for the image in case it's missing initially */}
                <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center text-slate-500 text-xs text-center p-4 z-0">
                  جاري تحميل صورة المفهوم التصميمي...
                </div>
                <Image 
                  src="/3elmstaba-concept.png" 
                  alt="3Elmstaba Cafe Cloud Kitchen Concept"
                  fill
                  className="object-cover z-10"
                />
              </div>

              {/* Boxed Highlights */}
              <div className="bg-[#0f172a] rounded-lg border border-cyan-500/30 p-4">
                <h4 className="text-cyan-400 font-bold mb-3">أبرز ملامح التنفيذ للباب الأيسر (توصيل أونلاين):</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">تحول مبسط للواجهة:</strong> الاستفادة من الهياكل الخشبية الريفية الحالية لتأطير كاونتر استلام مدمج دون أعمال بناء مكلفة.</li>
                  <li><strong className="text-white">لافتات رقمية عالية الوضوح:</strong> نشر لافتات/شاشات بارزة تستهدف عمال التوصيل ("طلبات الأونلاين فقط" و "امسح الكود للطلب").</li>
                  <li><strong className="text-white">منطقة مخصصة لوقوف الدراجات النارية:</strong> إعداد موقف مخصص لدراجات التوصيل النارية مباشرة خارج الباب الأيسر لإبعاد طوابير الـ Takeaway عن رواد المقهى.</li>
                  <li><strong className="text-white">تقليل التكلفة (Low Capex):</strong> إعداد يركز على معدات المطبخ الأساسية فقط (سيخ شاورما رأسي، شواية، كاونتر استانلس، وشفاط تهوية علوي).</li>
                </ul>
              </div>

            </div>
          </div>

          {/* Card 5: Consultant - Real World Execution */}
          <div className="bg-[#111827] rounded-xl overflow-hidden border-r-4 border-r-cyan-500 shadow-lg mt-6 mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="p-5">
              <h3 className="text-cyan-400 font-bold text-xs tracking-wider mb-4 uppercase">التنفيذ الواقعي بتكلفة محسّنة</h3>
              
              <p className="text-slate-200 leading-relaxed text-sm mb-5">
                على الرغم من أن الذكاء الاصطناعي يوضح الرؤية المستقبلية، إلا أنه يمكننا تنفيذ ذلك في الواقع <strong className="text-green-400">بأقل استثمار رأسمالي ممكن</strong>. عتبة الدخول منخفضة للغاية لأننا سنقوم بإعادة استخدام جماليات المقهى الحالية بدلاً من تغييرها بالكامل.
              </p>

              {/* Boxed Highlights */}
              <div className="bg-[#0f172a] rounded-lg border border-green-500/30 p-4">
                <h4 className="text-green-400 font-bold mb-3">خطوات التنفيذ بميزانية منخفضة:</h4>
                <ul className="space-y-3 text-sm text-slate-300 list-disc list-inside">
                  <li><strong className="text-white">إعادة استخدام السور المخطط:</strong> لا توجد أعمال بناء مكلفة. سنقوم ببساطة بعمل قطع نجارة صغير لإنشاء نافذة استلام في السور الخشبي الحالي المخطط بالأخضر والأحمر والخشبي.</li>
                  <li><strong className="text-white">الطباعة (فينيل) بدلاً من الشاشات:</strong> بدلاً من الشاشات الرقمية باهظة الثمن، نطبع لافتات فينيل عالية الجودة أو صناديق إضاءة (Lightboxes) ونعلقها مباشرة من صندوق الستارة المعدنية.</li>
                  <li><strong className="text-white">استغلال الأجواء الحالية:</strong> نحتفظ بمصابيح الإضاءة (إديسون) المعلقة والجدارية الجميلة للوجه كما هي، مما يحافظ على طابع فن الشارع الأصيل مع توفير تكاليف الطلاء والإضاءة.</li>
                </ul>
              </div>
            </div>
          </div>

        </div>

        {/* Powerful CTA Button to Ordering App */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-[#0b1121] via-[#0b1121] to-transparent z-50 pointer-events-none flex justify-center pb-8">
          <Link 
            href="/3elmstaba-order" 
            className="pointer-events-auto bg-gradient-to-r from-orange-500 to-orange-600 text-white w-full max-w-md text-center py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(249,115,22,0.4)] transition-transform active:scale-95 hover:scale-105"
          >
            🚀 عرض تطبيق طلبات الأونلاين المباشر
          </Link>
        </div>

        <div className="text-center mt-12 pb-24 text-slate-500 text-xs relative z-10">
          تم إنشاؤه لاستشارة 3Elmstaba Café الاستراتيجية<br/>سجل استراتيجية الأعمال والمفهوم المعماري
        </div>

      </div>
    </div>
  );
}
