const newFormHandler = async (event) => {
    event.preventDefault();
  
    const { value: title } = document.querySelector('input[name="post-title"]');
    const { value: post_content } = document.querySelector('textarea[name="post-content"]');
  
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify({ title, post_content }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  };
  
  document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);