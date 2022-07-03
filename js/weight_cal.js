transport_rate = { 'subway_area': 0.5,      //역세권여부
                   '30min_points': 0.3,     //30분 이내 도착 가능한 거점
                   '1hour_points' : 0.2  }  //1시간 이내 도착 가능한 거점

live_rate = {'housenum' : 0.35,          //세대수
             'years': 0.2,              //입주년차
             'parking_per_house': 0.15,  //세대당 주차수
             'heating': 0.1,           //난방방식
             'bathroom': 0.1,           //욕실 수
             'entrance': 0.1  }        //현관 구조

infra_rate = {'department_store' : 0.25,  //백화점
              'outlet_mall': 0.1,        //아울렛/몰
              'big_mart': 0.15,          //대형마트
              'bank': 0.05,              //은행
              'hospital': 0.1,           //병원
              'big_hospital': 0.15,      //종합병원
              'park': 0.03,              //공원
              'big_park': 0.05,          //대형공원
              'harmful': 0.02,           //혐오시설
              'market': 0.1}             //상권

infra_rate_metro = {'department_store' : 0.25,  //백화점
              'outlet_mall': 0.05,        //아울렛/몰
              'big_mart': 0.15,           //대형마트
              'bank': 0.05,               //은행
              'hospital': 0.1,            //병원
              'big_hospital': 0.15,       //종합병원
              'park': 0.03,               //공원
              'big_park' : 0.1,           //대형공원
              'harmful': 0.02,            //혐오시설
              'market': 0.1}              //상권              

education_rate = { 'primary_school': 0.25,    //초등학군
                   'academy': 0.3,            //학원가
                   'middle_school' : 0.45,    //중학군
                   'harmful' : 0.3  }  //중학군                   

total_rate_seoul = {  
                'supply':0,      //공급물량
                'transport': 0.2,   //교통
                'live': 0.3,        //주거
                'infra': 0.2,       //인프라
                'education': 0.3,   //학군
                'population':0,  //인구수/인구유입
                'job':0  }        //일자리

total_rate_metropolitan = {  
                'supply':0,      //공급물량
                'transport': 0.35,   //교통
                'live': 0.2,        //주거
                'infra': 0.3,       //인프라
                'education': 0.15,   //학군
                'population':0,  //인구수/인구유입
                'job':0  }        //일자리

total_rate_middle = {  
                'supply':0,      //공급물량
                'transport': 0.1,   //교통
                'live': 0.35,        //주거
                'infra': 0.2,       //인프라
                'education': 0.35,   //학군
                'population':0,  //인구수/인구유입
                'job':0  }        //일자리                

total_rate_urban = {  
                'supply':0,      //공급물량
                'transport': 0,   //교통
                'live': 0.4,        //주거
                'infra': 0.25,       //인프라
                'education': 0.35,   //학군
                'population':0,  //인구수/인구유입
                'job':0  }        //일자리