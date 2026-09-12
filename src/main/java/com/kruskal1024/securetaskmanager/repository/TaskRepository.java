package com.kruskal1024.securetaskmanager.repository;

import com.kruskal1024.securetaskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
}