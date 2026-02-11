package br.com.davez.api.repository;

import br.com.davez.api.model.entity.ScheduleHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScheduleHistoryRepository extends JpaRepository<ScheduleHistory, Long> {

    List<ScheduleHistory> findByScheduleIdOrderByChangedAtDesc(Long scheduleId);
}