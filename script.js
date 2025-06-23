
class QuoteApp {
  constructor() {
    this.quoteText = document.getElementById('quote-text');
    this.quoteAuthor = document.getElementById('quote-author');
    this.newQuoteBtn = document.getElementById('new-quote-btn');
    this.loading = document.getElementById('loading');
    
    this.init();
  }
  
  init() {
    this.newQuoteBtn.addEventListener('click', () => this.fetchNewQuote());
    
    // Load initial quote
    this.fetchNewQuote();
  }
  
  showLoading() {
    this.loading.classList.remove('hidden');
    this.newQuoteBtn.disabled = true;
  }
  
  hideLoading() {
    this.loading.classList.add('hidden');
    this.newQuoteBtn.disabled = false;
  }
  
  async fetchNewQuote() {
    try {
      this.showLoading();
      
      const response = await fetch('https://api.quotable.io/random');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      this.displayQuote(data.content, data.author);
      
    } catch (error) {
      console.error('Error fetching quote:', error);
      this.displayError();
    } finally {
      this.hideLoading();
    }
  }
  
  displayQuote(content, author) {
    // Add fade effect
    this.quoteText.style.opacity = '0';
    this.quoteAuthor.style.opacity = '0';
    
    setTimeout(() => {
      this.quoteText.textContent = content;
      this.quoteAuthor.textContent = author;
      
      this.quoteText.style.opacity = '1';
      this.quoteAuthor.style.opacity = '1';
    }, 150);
  }
  
  displayError() {
    this.displayQuote(
      "The only way to do great work is to love what you do.",
      "Steve Jobs"
    );
    
    // Show error message briefly
    const originalText = this.newQuoteBtn.textContent;
    this.newQuoteBtn.textContent = 'Error - Try Again';
    this.newQuoteBtn.style.background = '#e74c3c';
    
    setTimeout(() => {
      this.newQuoteBtn.textContent = originalText;
      this.newQuoteBtn.style.background = '';
    }, 2000);
  }
}

// Initialize app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new QuoteApp();
});

// Add smooth transitions
document.addEventListener('DOMContentLoaded', () => {
  const quoteText = document.getElementById('quote-text');
  const quoteAuthor = document.getElementById('quote-author');
  
  quoteText.style.transition = 'opacity 0.3s ease';
  quoteAuthor.style.transition = 'opacity 0.3s ease';
});
