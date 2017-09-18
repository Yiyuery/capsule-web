package cn.com.showclear.apollo;

import java.util.concurrent.ConcurrentLinkedQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class TestThread {
	
	public int x;
	
	public TestThread(int x) {
		this.x = x;
	}
	
	private static ConcurrentLinkedQueue<TestThread> queue = new ConcurrentLinkedQueue<TestThread>();
	private static ExecutorService exec = Executors.newCachedThreadPool();
	
	public static void push(TestThread t) {
		queue.add(t);
		//TODO 执行
		action();
	}
	
	private static void action() {
		if (!queue.isEmpty()) {
			exec.submit(new Runnable() {
				
				@Override
				public void run() {
					TestThread t = queue.poll();
					System.out.println(Thread.currentThread().getName() + "  "+t.x);
				}
			});
			
		}
	}
	
	
	public static void main(String[] args) {
		final TestThread t1 = new TestThread(1);
		final TestThread t2 = new TestThread(2);
		final TestThread t3 = new TestThread(3);
		final TestThread t4 = new TestThread(4);
		final TestThread t5 = new TestThread(5);
		
		Thread t = new Thread(new Runnable() {
			
			@Override
			public void run() {
				TestThread.push(t1);
				TestThread.push(t2);
				TestThread.push(t3);
				TestThread.push(t4);
			}
		},"A");
		
		Thread tt = new Thread(new Runnable() {
			
			@Override
			public void run() {
				TestThread.push(t2);
			}
		},"B");
		
		Thread ttt = new Thread(new Runnable() {
			
			@Override
			public void run() {
				TestThread.push(t3);
			}
		},"C");
		
		Thread tttt = new Thread(new Runnable() {
			
			@Override
			public void run() {
				TestThread.push(t4);
			}
		},"D");
		
		t.start();
		tt.start();
		ttt.start();
		tttt.start();
		
	}
	
	
}
