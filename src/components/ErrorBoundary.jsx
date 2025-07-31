import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state，讓下一次 render 顯示 fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // 在這裡記錄錯誤，例如發送到監控工具
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    console.error('Props:', this.props.element);
  }

  render() {
    if (this.state.hasError) {
      return <span>error</span>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
