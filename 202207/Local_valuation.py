from pandas.core.indexes.base import Index
import requests
import datetime
import os
import pandas as pd
import json
import math
from urllib import parse
from haversine import haversine

path = os.path.dirname( os.path.abspath(__file__) )
temp_path = path.split('\\')

prev_file_name = "Location_Valuated_202206"
prev_file = temp_path[0] + "/" + temp_path[1] + '/90_Local_valuation/' + prev_file_name + '.csv'
prev_base = pd.read_csv(prev_file, encoding="cp949")

code_file_name = "location_code"
code_file = temp_path[0] + "/" + temp_path[1] + '/90_Local_valuation/' + code_file_name + '.csv'
code_base = pd.read_csv(code_file, encoding="cp949")

supply_file_name = "Supply_Result_202207"
supply_file = temp_path[0] + "/" + temp_path[1] + '/07_Supply/' + supply_file_name + '.csv'
supply_base = pd.read_csv(supply_file, encoding="cp949")

population_file_name = "population_analysis_result_202207"
population_file = temp_path[0] + "/" + temp_path[1] + '/03_Job/02_Population/' + population_file_name + '.csv'
population_base = pd.read_csv(population_file, encoding="cp949")

people_move_file_name = "people_move_analysis_202207"
people_move_file = temp_path[0] + "/" + temp_path[1] + '/03_Job/02_Population/' + people_move_file_name + '.csv'
people_move_base = pd.read_csv(people_move_file, encoding="cp949")

job_file_name = "job_202207"
job_file = temp_path[0] + "/" + temp_path[1] + '/03_Job/01_Job/' + job_file_name + '.csv'
job_base = pd.read_csv(job_file, encoding="cp949")

income_file_name = "income_202207"
income_file = temp_path[0] + "/" + temp_path[1] + '/03_Job/03_Income/' + income_file_name + '.csv'
income_base = pd.read_csv(income_file, encoding="cp949")

now = datetime.datetime.now()
#current_date = str(now.year) + str( format (now.month, '02') ) + str( format (now.day, '02') )
current_date = str(now.year) + str( format (now.month, '02') )

#지역구 공급물량 점수 리턴
def get_supply_score(location):
    df = supply_base[supply_base['시도'].str.contains(location) ]
    supply = df.iloc[0]['공급수준']
    supply_score = df.iloc[0]['공급점수']

    return supply, supply_score

def get_population_score(location):
    df = population_base[population_base['행정구역명칭'].str.contains(location) ]

    try:
        return df.iloc[0]['총인구'], df.iloc[0]['총점']
    except IndexError:
        print("인수점수 ERROR")
        return '0', '0'

def get_people_move_score(location):
    df = people_move_base[ people_move_base['시군구'].str.contains(location) ]

    try:    
        return df.iloc[0]['이동합계'], df.iloc[0]['환산점수']
    except IndexError:
        print("이동점수 ERROR")
        return '0', '0'

def get_job_score(location):    
    df = job_base[ job_base['지역별'] == location ]

    try:    
        return df.iloc[0]['전체종사자'], df.iloc[0]['총점']
    except IndexError:
        print("일자리점수 ERROR")
        return '0', '0'

def get_income_score(location):
    df = income_base[income_base['행정구역'].str.contains(location)]
    try:        
        return df.iloc[0]['평균'], df.iloc[0]['총점']        
    except IndexError:
        print("소득점수 ERROR")
        return '0', '0'    

total_rate = {  'supply':0.35,      #공급물량
                'population':0.2,  #인구수/인구유입
                'job':0.45  }        #일자리

supply_rate = { 'supply' : 1.0 }

population_rate = {'population': 0.8,      #인구 수
                   'people_move': 0.2,  }  #인구 이동

job_rate = {'job' : 0.9,      #일자리 수
            'income': 0.1  }  #소득 점수

def cal_valuation():
    global total_rate
    global supply_rate
    global population_rate
    global job_rate

    sum_list = []    

    for i in range(len(supply_base)):
        location = supply_base.iloc[i]['시도']
        linked_file = str(  code_base[code_base['name'] == location].iloc[0]['code'] ) + "_" + code_base[code_base['name'] == location].iloc[0]['name_en']
        print(location)
        
        #지역구 물량 점수 계산
        supply_supply = get_supply_score(location)
        supply_volume = supply_base.iloc[i]['총물량']
        supply_profer = supply_base.iloc[i]['적정입주물량']
        supply_gap = supply_base.iloc[i]['과부족수']
        supply_total = ( (supply_supply[1] * supply_rate['supply']) )


        #인구점수
        population_population = get_population_score(location)

        #인구이동 점수
        population_people_move = get_people_move_score(location)

        population_total = ( ( float(population_population[1]) * population_rate['population']) + (float(population_people_move[1]) * population_rate['people_move'])  )

        #일자리 점수
        job_job = get_job_score(location)

        #소득 점수
        #소득을 10만 단위에서 반올림해서 저장
        job_income = get_income_score(location)
        income_temp = job_income[0].replace(',', "")
        income_temp = round((int(income_temp) / 100000), 0)
        income_result = income_temp * 100000

        job_total = ( (float(job_job[1]) * job_rate['job']) + (float(job_income[1]) * job_rate['income']) )

        value_total = ( (supply_total * total_rate['supply']) + (population_total * total_rate['population']) + (job_total * total_rate['job']) )

        #연결파일이름

        sum_list.append([location,
                        supply_volume, supply_profer, supply_gap, supply_supply[0], supply_total,
                        population_population[0], population_people_move[0], population_total,
                        job_job[0], income_result, job_total,
                        value_total, linked_file
                        ])

    final_data = pd.DataFrame(sum_list, columns=['시도',
                                                '총물량', '적정입주물량', '과부족수', '공급수준', '지역구공급총점',                                                
                                                '인구수', '인구증감', '인구총점',
                                                '일자리', '소득수준', '일자리총점',
                                                '가치 총점', "연결명"
                                                ])
    merged = final_data
    merged['rank'] = merged['가치 총점'].rank(method='dense', ascending=False)
    merged = merged.sort_values(by=['가치 총점'], axis = 0, ascending=False)

    save_list = []
    for i in range(len(merged)):        
        rank_df = prev_base[ prev_base['시도'] == merged.iloc[i]['시도']]
        #rank_prev = "202202", int(rank_df.iloc[0]['rank'])
        rank_prev = rank_df.iloc[0]['rank_history']
        rank_prev = eval(rank_prev)

        rank_temp = []
        rank_current = "202207", int(merged.iloc[i]['rank'])
        rank_temp.append(rank_current)
        for k in range(len(rank_prev)):
            rank_temp.append(rank_prev[k])        
        save_list.append(rank_temp)

    merged['rank_history'] = save_list

    rank_gap_list = []
    for i in range(len(merged)):
        print(merged.iloc[i]['rank_history'])
        rank_gap = int(merged.iloc[i]['rank_history'][1][1]) - int(merged.iloc[i]['rank_history'][0][1])
        rank_gap_list.append(rank_gap)

    merged['rank_gap'] = rank_gap_list

    #merged.to_csv(path + "/Location_Valuated_" + current_date + '.csv', encoding="CP949")
    merged.to_csv(path + "/Location_Valuated_202207.csv", encoding="CP949")
    merged.to_json(path + "/1000000000_Korea.json", orient="table", force_ascii=False, indent=4)

cal_valuation()