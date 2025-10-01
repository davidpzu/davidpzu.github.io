/*!
 * jQuery JavaScript Library v3.7.1
 * https://jquery.com/
 *
 * Copyright OpenJS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2023-08-28T13:37Z
 */
document.addEventListener("DOMContentLoaded", () => {
  const translations = {
    en: {
      talk: "Let's Talk",
      about: "About Me",
      contact: "Contact",
      specialization_label: "Specialization:",
      specialization_value: "UI/UX designer",
      location_label: "Based in:",
      location_value: "Madrid, Spain",
      cta_work_together: "Let's Work Together!",
      headline_subtitle: "Let's meet!",
      headline_name: "David Prieto Zurita, UI/UX designer",
      headline_tagline: "\"turning ideas into bold, usable interfaces\"",
      headline_btn_works: "My Works",
      headline_btn_cv: "Download CV",
      scroll: "Scroll for More * Scroll for More * ",
      portfolio_title: "Check out my featured projects",
      about_title: "Turning complex problems into simple design",
      achievement_one: "Figma projects",
      achievement_two: "Years of experience",
      achievement_three: "Problems solved",
      bio_one: "Over the years I’ve grown from a fresh junior designer into a professional with solid experience in UI/UX and working with clients. I have had the chance of working closely with clients which has taught me how to understand their needs translating them into clear design solutions, as well as deliver projects that answer user needs. Thanks to these experiences I have changed the way I approach design: as a tool to solve real problems and create meaningful user experiences.",
      bio_two: "Beyond design, I’ve discovered a passion for languages and music, which have opened doors to incredible experiences across Europe and even to China, where I lived for half a year. For the past eight years I’ve been based in Madrid, a city that I have felt in love with for its international atmosphere and the opportunities it offers to keep learning, growing, and getting to know experts in the design industry, whether it be events or hangouts in a collaborative space.",
      name_label: "Name",
      phone_label: "Phone",
      email_label: "Email",
      languages_label: "Languages spoken:",
      languages_value_one: "Spanish (native)",
      languages_value_two: "English (proficiency C1)",
      languages_value_three: "French (proficiency B1)",
      languages_value_four: "Korean (proficiency B1)",
      languages_value_five: "Chinese (proficiency A2)",
      resume_bio: "Education and practical experience",
      resume_description: "Passionate about continuous learning, I stay up to date with the latest UI design trends and innovations. I have incorporated a constant study about how leading companies approach UX challenges, applying their best practices to create functional and user-friendly interfaces. My education is complemented by maintaining a reading habit, experimenting, and refining my skills in design and user experience.",
      resume_education: "My education",
      education_one_title: "Graphic Design & Prepress",
      education_one_place: "Course by Gauss Multimedia",
      education_one_description: "Learned the fundamentals of design, layout, color theory, and mastering Adobe Creative Suite tools.",
      education_two_title: "Web Design & Development",
      education_two_description: "Gained experience in front-end development with HTML, CSS, JavaScript, CMS, and responsive UI design using Bootstrap.",
      education_three_title: "Google UX Design",
      education_three_place: "Course by Coursera",
      education_three_description: "Acquired practical skills in user-centered design, usability, prototyping, and UX workflows, as well as the daily of a UX designer.",
      resume_work: "Work experience",
      work_years: "2018 - now",
      work_one_title: "Visual, UI & UX Designer",
      work_one_place: "at",
      work_one_description: "For the past eight years I have worked closely with clients, guiding them from the first idea to the final product. My role has been to understand their needs and suggest solutions that combine usability, modern design, and business goals. I’ve worked across a wide range of areas, from branding and UI interfaces to video editing, motion graphics, and even off-line materials. Since 2023, following advanced UX training, I have focused more on creating user-centered experiences, working with my team in the latest practices of the industry",
      work_two_title: "Freelance Designer",
      work_two_description: "Taking part in projects that range from Branding to UI design working directly with the client to come up with the best solutions both user and company-oriented.",
      tools: "Software",
      contact_title: "Let's make something awesome together!",
      form_sent: "Done!",
      form_thankyou: "Thanks for your message. I'll get back as soon as possible.",
      contact_name: "Your name*",
      contact_company: "Company name",
      contact_email: "Email address*",
      contact_phone: "Phone number*",
      contact_message: "What's on your mind? I'm all ears*",
      contact_send: "Send message",
      goodbye: "Want to know more about me, tell me about your project or just to say hello? Drop me a line and I'll get back as soon as possible."
    },

    es: {
      talk: "Hablemos",
      about: "Sobre mí",
      contact: "Contacto",
      specialization_label: "Especialización:",
      specialization_value: "Diseñador UI/UX",
      location_label: "Ubicación:",
      location_value: "Madrid, España",
      cta_work_together: "¡Trabajemos juntos!",
      headline_subtitle: "¡Vamos a conocernos!",
      headline_name: "David Prieto Zurita, Diseñador UI/UX",
      headline_tagline: "\"convirtiendo ideas en interfaces modernas y usables\"",
      headline_btn_works: "Mis Trabajos",
      headline_btn_cv: "Descargar mi CV",
      scroll: "Desliza para más * Desliza para más * ",
      portfolio_title: "Mira mis proyectos destacados",
      about_title: "Convirtiendo problemas complejos en diseños simples",
      achievement_one: "Proyectos en Figma",
      achievement_two: "Años de experiencia",
      achievement_three: "Problemas resueltos",
      bio_one: "A lo largo de los años, he crecido de ser un diseñador junior sin experiencia a convertirme en un profesional con una sólida experiencia en UI/UX. He tenido la oportunidad de trabajar en colaboración con los clientes, lo que me ha enseñado a comprender sus necesidades y a traducirlas en soluciones de diseño claras, así como a entregar proyectos que respondan a las necesidades de los usuarios. Gracias a estas experiencias, ha cambiado mi forma de ver el diseño: como una herramienta para resolver problemas reales y crear experiencias que ayuden para los usuarios",
      bio_two: "Más allá del diseño, he descubierto mi pasión por los idiomas y la música, lo que me ha abierto las puertas a experiencias increíbles por toda Europa e incluso en China, donde viví durante medio año. Durante los últimos ocho años he vivido en Madrid, una ciudad de la que me he enamorado por su ambiente internacional y las oportunidades que ofrece para seguir aprendiendo, creciendo y conociendo a expertos del sector del diseño, ya sea en eventos o reuniones en espacios colaborativos.",
      name_label: "Nombre:",
      phone_label: "Teléfono:",
      email_label: "Correo electrónico:",
      languages_label: "Idiomas hablados:",
      languages_value_one: "Español (nativo)",
      languages_value_two: "Inglés (competencia C1)",
      languages_value_three: "Francés (competencia B1)",
      languages_value_four: "Coreano (competencia B1)",
      languages_value_five: "Chino (competencia A2)",
      resume_title: "Educación y experiencia",
      resume_description: "Apasionado por el aprendizaje continuo, me mantengo al día con las últimas tendencias e innovaciones en diseño UI. No pierdo ojo de cómo las principales compañías se enfrentan a nuevos retos de UX, aplicando sus mejores prácticas para crear interfaces funcionales y fáciles de usar. Mi formación se complementa con una constante motivación por leer, experimentar y perfeccionar mis habilidades en diseño y experiencia de usuario.",
      resume_education: "Mi educación",
      education_one_title: "Diseño Gráfico & Preimpresión",
      education_one_place: "Curso por Gauss Multimedia",
      education_one_description: "Aprendí los fundamentos del diseño, maquetación, teoría del color y el uso de las herramientas de Adobe Creative Suite.",
      education_two_title: "Diseño y Desarrollo Web",
      education_two_description: "Adquirí experiencia en desarrollo front-end con HTML, CSS, JavaScript, CMS y diseño de interfaces responsivas con Bootstrap.",
      education_three_title: "Google UX Design",
      education_three_place: "Curso por Coursera",
      education_three_description: "Aprendí las habilidades prácticas en diseño centrado en el usuario, usabilidad, prototipado así como la vida diaria de un diseñador UX.",
      resume_work: "Experiencia laboral",
      work_years: "2018 - ahora",
      work_one_title: "Diseñador Visual, UI & UX",
      work_one_place: "en",
      work_one_description: "Durante los últimos ocho años he trabajado en colaboración con los clientes, guiándolos desde la idea inicial hasta el producto final. Mi función ha consistido en entender sus necesidades y proponer soluciones que combinen usabilidad, diseño moderno así como los objetivos de la empresa. He trabajado en una amplia gama de áreas, desde branding e interfaces de usuario hasta edición de vídeo, gráficos en movimiento e incluso materiales offline. Desde 2023, tras recibir formación avanzada en UX, me he centrado más en crear experiencias centradas en el usuario, trabajando con mi equipo usando las últimas prácticas del sector.",
      work_two_title: "Diseñador Freelance",
      work_two_description: "Participar en proyectos que abarcan desde el branding hasta el diseño de interfaces de usuario, trabajando directamente con el cliente para encontrar las mejores soluciones orientadas para el usuario así como la empresa.",
      tools: "Software",
      contact_title: "¡Hagamos algo increíble juntos!",
      form_sent: "¡Listo!",
      form_thankyou: "Gracias por tu mensaje. Te responderé lo antes posible.",
      contact_name: "Tu nombre*",
      contact_company: "Empresa",
      contact_email: "Correo electrónico*",
      contact_phone: "Número de teléfono*",
      contact_message: "Cuéntame tu inquietud*",
      contact_send: "Enviar mensaje",
      goodbye: "¿Quieres saber más sobre mí, contarme tu proyecto o simplemente saludar? Déjame un mensaje y te responderé lo antes posible."
      }
  };

  // Language switcher button
  const langSwitcher = document.getElementById("lang-switcher");
  if (!langSwitcher) return;

  // Detect saved language or browser language
  let currentLang = localStorage.getItem("lang") || 
    (navigator.language.startsWith("es") ? "es" : "en");

  // Function to update all translatable text and placeholders
  function updateLanguage(lang) {
    // Text content
    document.querySelectorAll("[data-translate]").forEach(el => {
      const key = el.getAttribute("data-translate");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    // Placeholders
    document.querySelectorAll("[data-translate-placeholder]").forEach(el => {
      const key = el.getAttribute("data-translate-placeholder");
      if (translations[lang][key]) {
        el.setAttribute("placeholder", translations[lang][key]);
      }
    });

    // Update language button
    langSwitcher.textContent = lang.toUpperCase();
    localStorage.setItem("lang", lang);
  }

  // Button click toggles language
  langSwitcher.addEventListener("click", () => {
    currentLang = currentLang === "en" ? "es" : "en";
    updateLanguage(currentLang);
  });

  // Initial load
  updateLanguage(currentLang);
});
