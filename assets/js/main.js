// بيانات الفعاليات (يمكن استبدالها بقاعدة بيانات حقيقية)
const eventsData = [
    {
        id: 1,
        title: "مهرجان الموسيقى السنوي",
        category: "موسيقى",
        date: "2024-10-15",
        endDate: "2024-10-17",
        location: "الساحة المركزية",
        image: "assets/img/events/event1.jpg",
        description: "أضخم مهرجان موسيقي سنوي يجمع أفضل الفنانين المحليين والعالميين",
        price: "مجاني",
        time: "6:00 مساءً - 12:00 منتصف الليل"
    },
    {
        id: 2,
        title: "معرض الفنون التشكيلية",
        category: "ثقافة",
        date: "2024-10-20",
        endDate: "2024-10-25",
        location: "المتحف الوطني",
        image: "assets/img/events/event2.jpg",
        description: "معرض يضم أحدث الأعمال الفنية التشكيلية لفنانين محليين وعالميين",
        price: "20 ريال",
        time: "10:00 صباحاً - 8:00 مساءً"
    },
    {
        id: 3,
        title: "ماراثون المدينة",
        category: "رياضة",
        date: "2024-10-12",
        location: "الواجهة البحرية",
        image: "assets/img/events/event3.jpg",
        description: "سباق ماراثون سنوي لمسافة 42 كلم بمشاركة محلية ودولية",
        price: "50 ريال",
        time: "6:00 صباحاً - 12:00 ظهراً"
    },
    {
        id: 4,
        title: "ورشة البرمجة للمبتدئين",
        category: "تعليم",
        date: "2024-10-18",
        location: "مركز الابتكار",
        image: "assets/img/events/event4.jpg",
        description: "ورشة تعليمية مكثفة لتعلم أساسيات البرمجة وتطوير الويب",
        price: "100 ريال",
        time: "4:00 مساءً - 8:00 مساءً"
    }
];

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // تحميل الفعاليات في الصفحة الرئيسية
    if (document.getElementById('eventsGrid')) {
        loadFeaturedEvents();
    }
    
    // تحميل جميع الفعاليات في صفحة الفعاليات
    if (document.getElementById('allEvents')) {
        loadAllEvents();
        setupEventFilters();
    }
    
    // إعداد نموذج الاتصال
    if (document.getElementById('contactForm')) {
        setupContactForm();
    }
    
    // إعداد أزرار التصنيفات
    setupCategoryButtons();
    
    // إعداد الوضع المظكم (بونص)
    setupDarkMode();
}

// تحميل الفعاليات المميزة في الصفحة الرئيسية
function loadFeaturedEvents() {
    const eventsGrid = document.getElementById('eventsGrid');
    const featuredEvents = eventsData.slice(0, 3); // أول 3 فعاليات كمميزة
    
    featuredEvents.forEach(event => {
        const eventCard = createEventCard(event);
        eventsGrid.appendChild(eventCard);
    });
}

// تحميل جميع الفعاليات في صفحة الفعاليات
function loadAllEvents(filteredEvents = eventsData) {
    const allEvents = document.getElementById('allEvents');
    allEvents.innerHTML = '';
    
    filteredEvents.forEach(event => {
        const eventCard = createEventCard(event, true);
        allEvents.appendChild(eventCard);
    });
}

// إنشاء بطاقة فعالية
function createEventCard(event, showDetailsBtn = false) {
    const col = document.createElement('div');
    col.className = 'col-md-4 mb-4';
    
    col.innerHTML = `
        <div class="card event-card h-100">
            <img src="${event.image}" class="card-img-top" alt="${event.title}" style="height: 200px; object-fit: cover;">
            <div class="card-body d-flex flex-column">
                <div class="d-flex justify-content-between align-items-start mb-2">
                    <span class="badge bg-primary">${event.category}</span>
                    <small class="text-muted">${formatDate(event.date)}</small>
                </div>
                <h5 class="card-title">${event.title}</h5>
                <p class="card-text flex-grow-1">${event.description}</p>
                <div class="mt-auto">
                    <p class="card-text"><small class="text-muted">📍 ${event.location}</small></p>
                    ${showDetailsBtn ? 
                        `<a href="event.html?id=${event.id}" class="btn btn-primary w-100">تفاصيل الفعالية</a>` : 
                        `<a href="event.html?id=${event.id}" class="btn btn-outline-primary w-100">المزيد</a>`
                    }
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// تنسيق التاريخ
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('ar-SA', options);
}

// إعداد فلترة الفعاليات
function setupEventFilters() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const filterBtn = document.getElementById('filterBtn');
    
    filterBtn.addEventListener('click', applyFilters);
    
    // البحث أثناء الكتابة
    searchInput.addEventListener('input', applyFilters);
    categoryFilter.addEventListener('change', applyFilters);
    dateFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const date = document.getElementById('dateFilter').value;
    
    const filteredEvents = eventsData.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchTerm) || 
                             event.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || event.category === category;
        const matchesDate = !date || event.date === date;
        
        return matchesSearch && matchesCategory && matchesDate;
    });
    
    loadAllEvents(filteredEvents);
}

// إعداد أزرار التصنيفات
function setupCategoryButtons() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // إذا كان الزر نشطاً، قم بإلغاء التفعيل
            if (this.classList.contains('active')) {
                this.classList.remove('active');
                loadAllEvents(eventsData);
            } else {
                // إلغاء تفعيل جميع الأزرار
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // تفعيل الزر الحالي
                this.classList.add('active');
                
                // تصفية الفعاليات حسب التصنيف
                const filteredEvents = eventsData.filter(event => event.category === category);
                if (document.getElementById('allEvents')) {
                    loadAllEvents(filteredEvents);
                }
            }
        });
    });
}

// إعداد نموذج الاتصال
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateContactForm()) {
            // محاكاة إرسال النموذج
            showAlert('تم إرسال رسالتك بنجاح! سنقوم بالرد عليك في أقرب وقت.', 'success');
            contactForm.reset();
        }
    });
}

// التحقق من صحة نموذج الاتصال
function validateContactForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    let isValid = true;
    
    // التحقق من الاسم
    if (!name.value.trim()) {
        name.classList.add('is-invalid');
        isValid = false;
    } else {
        name.classList.remove('is-invalid');
    }
    
    // التحقق من البريد الإلكتروني
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
        email.classList.add('is-invalid');
        isValid = false;
    } else {
        email.classList.remove('is-invalid');
    }
    
    // التحقق من الموضوع
    if (!subject.value) {
        subject.classList.add('is-invalid');
        isValid = false;
    } else {
        subject.classList.remove('is-invalid');
    }
    
    // التحقق من الرسالة
    if (!message.value.trim()) {
        message.classList.add('is-invalid');
        isValid = false;
    } else {
        message.classList.remove('is-invalid');
    }
    
    return isValid;
}

// عرض رسائل التنبيه
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('contactForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    // إزالة التنبيه تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.parentNode.removeChild(alertDiv);
        }
    }, 5000);
}

// وظائف إضافية للفعاليات
function addToCalendar() {
    showAlert('تمت إضافة الفعالية إلى تقويمك', 'success');
}

function shareEvent() {
    if (navigator.share) {
        navigator.share({
            title: document.title,
            text: 'تفضل بمشاهدة هذه الفعالية المميزة',
            url: window.location.href
        });
    } else {
        showAlert('رابط الفعالية: ' + window.location.href, 'info');
    }
}

// إعداد الوضع المظكم (بونص)
function setupDarkMode() {
    const darkModeToggle = document.createElement('button');
    darkModeToggle.className = 'btn btn-outline-secondary position-fixed';
    darkModeToggle.style.bottom = '20px';
    darkModeToggle.style.left = '20px';
    darkModeToggle.style.zIndex = '1000';
    darkModeToggle.innerHTML = '🌙';
    darkModeToggle.title = 'تبديل الوضع المظلم';
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        this.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        
        // حفظ التفضيل في localStorage
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
    
    // تحميل تفضيل الوضع المظكم من localStorage
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        darkModeToggle.innerHTML = '☀️';
    }
    
    document.body.appendChild(darkModeToggle);
}

// وظيفة للتمرير إلى الأعلى (بونص)
function createScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'btn btn-primary position-fixed';
    scrollBtn.style.bottom = '20px';
    scrollBtn.style.right = '20px';
    scrollBtn.style.zIndex = '1000';
    scrollBtn.innerHTML = '↑';
    scrollBtn.title = 'التمرير إلى الأعلى';
    
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // إظهار/إخفاء الزر حسب موضع التمرير
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollBtn.style.display = 'block';
        } else {
            scrollBtn.style.display = 'none';
        }
    });
    
    scrollBtn.style.display = 'none';
    document.body.appendChild(scrollBtn);
}

// استدعاء وظيفة التمرير إلى الأعلى
createScrollToTop();